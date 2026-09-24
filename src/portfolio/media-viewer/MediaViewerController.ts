import { createContext, useContext } from 'react'
import type { ImageViewerGroup, PdfViewerCapability } from './mediaViewer.types'

export type MediaViewerController = Readonly<{
  openPdf: (item: PdfViewerCapability, trigger: HTMLElement) => void
  openImage: (group: ImageViewerGroup, index: number, trigger: HTMLElement) => void
}>

export const MediaViewerControllerContext = createContext<MediaViewerController | undefined>(undefined)

export const useMediaViewer = (): MediaViewerController | undefined => useContext(MediaViewerControllerContext)
