import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useState } from 'react'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { createImageViewerGroup, IMAGE_EMBED_LIMIT_BYTES, PDF_EMBED_LIMIT_BYTES, resolveImageCapability, resolvePdfCapability } from './mediaCapability'
import { MediaViewerProvider } from './MediaViewerContext'
import { useMediaViewer } from './MediaViewerController'

beforeAll(() => {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
    configurable: true,
    value() { this.setAttribute('open', '') },
  })
  Object.defineProperty(HTMLDialogElement.prototype, 'close', {
    configurable: true,
    value() { this.removeAttribute('open') },
  })
})

afterEach(() => cleanup())

const pdf = (bytes?: number) => {
  const result = resolvePdfCapability({ id: 'paper', title: 'Research paper', description: 'Reviewed publication.', context: 'Computational project', href: '/paper.pdf', bytes })
  if (!result.ok) throw new Error('Expected PDF capability.')
  return result.capability
}

const image = (id: string, bytes?: number) => {
  const result = resolveImageCapability({ id, title: `Image ${id}`, description: 'Reviewed project image.', context: 'Scientific Research', href: `/${id}.jpg`, width: 1200, height: 800, alt: `Image ${id}`, bytes })
  if (!result.ok) throw new Error('Expected image capability.')
  return result.capability
}

function PdfTrigger({ oversized = false, removeOnOpen = false }: Readonly<{ oversized?: boolean; removeOnOpen?: boolean }>) {
  const viewer = useMediaViewer()
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  return <button type="button" data-testid="pdf-trigger" onClick={(event) => {
    viewer?.openPdf(pdf(oversized ? PDF_EMBED_LIMIT_BYTES + 1 : undefined), event.currentTarget)
    if (removeOnOpen) setVisible(false)
  }}>Review paper</button>
}

function ImageTrigger({ count = 2, oversized = false }: Readonly<{ count?: number; oversized?: boolean }>) {
  const viewer = useMediaViewer()
  const items = Array.from({ length: count }, (_, index) => image(String(index + 1), oversized ? IMAGE_EMBED_LIMIT_BYTES + 1 : undefined))
  const group = createImageViewerGroup('research-images', 'Research images', items)
  if (!group) return null
  return <button type="button" data-testid="image-trigger" onClick={(event) => viewer?.openImage(group, 0, event.currentTarget)}>Review images</button>
}

function ReplacementTriggers() {
  const viewer = useMediaViewer()
  const group = createImageViewerGroup('replacement-images', 'Replacement images', [image('replacement')])
  if (!group) return null
  return <>
    <button type="button" data-testid="replace-pdf" onClick={(event) => viewer?.openPdf(pdf(), event.currentTarget)}>Open PDF</button>
    <button type="button" data-testid="replace-image" onClick={(event) => viewer?.openImage(group, 0, event.currentTarget)}>Open image</button>
  </>
}

const renderViewer = (trigger: React.ReactNode) => render(<>
  <main id="scan-field">Background content</main>
  <MediaViewerProvider>{trigger}</MediaViewerProvider>
</>)

describe('shared media viewer host', () => {
  it('opens an accessibly named PDF dialog, locks the background, closes with Escape, and restores focus', async () => {
    renderViewer(<PdfTrigger />)
    const trigger = screen.getByTestId('pdf-trigger')
    trigger.focus()
    fireEvent.click(trigger)
    const dialog = await screen.findByRole('dialog', { name: 'Research paper' })
    expect(dialog).toHaveAttribute('open')
    expect(document.querySelector('#scan-field')).toHaveAttribute('inert')
    expect(screen.getByTestId('media-viewer-close-button')).toHaveFocus()
    expect(await screen.findByTitle('Research paper PDF')).toHaveAttribute('src', '/paper.pdf')
    fireEvent.keyDown(dialog, { key: 'Escape' })
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(document.querySelector('#scan-field')).not.toHaveAttribute('inert')
    expect(trigger).toHaveFocus()
  })

  it('contains keyboard focus and supports backdrop and explicit Close dismissal', async () => {
    renderViewer(<PdfTrigger />)
    fireEvent.click(screen.getByTestId('pdf-trigger'))
    const dialog = await screen.findByRole('dialog')
    fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true })
    expect(screen.getByTestId('media-viewer-download-action')).toHaveFocus()
    fireEvent.click(dialog)
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    fireEvent.click(screen.getByTestId('pdf-trigger'))
    await screen.findByRole('dialog')
    fireEvent.click(screen.getByTestId('media-viewer-close-button'))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('bounds multi-image navigation and disables both directions for a single image', async () => {
    const { unmount } = renderViewer(<ImageTrigger />)
    fireEvent.click(screen.getByTestId('image-trigger'))
    expect(await screen.findByTestId('media-viewer-position')).toHaveTextContent('Image 1 of 2')
    expect(screen.getByTestId('media-viewer-previous-button')).toBeDisabled()
    fireEvent.click(screen.getByTestId('media-viewer-next-button'))
    expect(screen.getByTestId('media-viewer-position')).toHaveTextContent('Image 2 of 2')
    expect(screen.getByTestId('media-viewer-next-button')).toBeDisabled()
    unmount()

    renderViewer(<ImageTrigger count={1} />)
    fireEvent.click(screen.getByTestId('image-trigger'))
    expect(await screen.findByTestId('media-viewer-position')).toHaveTextContent('Image 1 of 1')
    expect(screen.getByTestId('media-viewer-previous-button')).toBeDisabled()
    expect(screen.getByTestId('media-viewer-next-button')).toBeDisabled()
    expect(screen.getByLabelText('Scrollable full image preview')).toHaveAttribute('tabindex', '0')
  })

  it('keeps oversized media operable through direct actions and handles a removed trigger safely', async () => {
    const { unmount } = renderViewer(<PdfTrigger oversized removeOnOpen />)
    fireEvent.click(screen.getByTestId('pdf-trigger'))
    expect(await screen.findByText('This document is available through the actions below.')).toBeInTheDocument()
    expect(screen.getByTestId('media-viewer-open-action')).toHaveAttribute('href', '/paper.pdf')
    fireEvent.click(screen.getByTestId('media-viewer-close-button'))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    unmount()

    renderViewer(<ImageTrigger count={1} oversized />)
    fireEvent.click(screen.getByTestId('image-trigger'))
    expect(await screen.findByText('This image is available through the actions below.')).toBeInTheDocument()
    expect(screen.getByTestId('media-viewer-download-action')).toHaveAttribute('href', '/1.jpg')
  })

  it('downgrades a failed image without leaking internal details', async () => {
    renderViewer(<ImageTrigger count={1} />)
    fireEvent.click(screen.getByTestId('image-trigger'))
    const detailImage = await screen.findByAltText('Image 1')
    fireEvent.error(detailImage)
    expect(await screen.findByTestId('media-viewer-failure-body')).toHaveTextContent('Media unavailable.')
    expect(screen.queryByText(/stack|exception|path/i)).not.toBeInTheDocument()
  })

  it('replaces open media during rapid interaction and cleans global state on unmount', async () => {
    const view = renderViewer(<ReplacementTriggers />)
    fireEvent.click(screen.getByTestId('replace-pdf'))
    expect(await screen.findByRole('dialog', { name: 'Research paper' })).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('replace-image'))
    expect(await screen.findByRole('dialog', { name: 'Image replacement' })).toBeInTheDocument()
    expect(screen.queryByTitle('Research paper PDF')).not.toBeInTheDocument()
    expect(document.querySelector('#scan-field')).toHaveAttribute('inert')
    view.unmount()
    expect(document.querySelector('#scan-field')).toBeNull()
    expect(document.documentElement.className).not.toMatch(/viewerLocked/)
  })

})
