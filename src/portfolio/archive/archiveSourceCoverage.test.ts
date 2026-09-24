import { access, readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { archiveGroups } from './archiveGroups'

const manifest = JSON.parse(await readFile('src/portfolio/archive/generated/archive-manifest.json', 'utf8'))
const groupRoot = 'src/portfolio/archive/generated/groups'
const transcriptIds = ['asset-0857163ebd922f5c0723', 'asset-1fa6103b2d5218d4582b']
const narrativeDockingImageId = 'asset-02ed8286ffa69acd6cd0'
const archiveDockingImageIds = [
  'asset-2e7f7799ff0ac20929d2',
  'asset-2fe544898047bc141c69',
  'asset-33f273994f6986d06291',
  'asset-6ac9d9b9698aa3b2310a',
]

describe('U-04 source coverage and exclusions', () => {
  it('retains all 109 non-system source memberships inside the 127-file governed inventory', () => {
    const sourceMemberships = manifest.items.flatMap((item: { physicalSources: { sourceRelativePath: string }[] }) => item.physicalSources)
      .filter(({ sourceRelativePath }: { sourceRelativePath: string }) => sourceRelativePath.startsWith('source/'))
    expect(manifest.physicalFileCount).toBe(127)
    expect(manifest.items).toHaveLength(110)
    expect(sourceMemberships).toHaveLength(109)
  })

  it('keeps transcripts and the narrative-owned conference photograph out of generated card modules', async () => {
    const generated = (await Promise.all((await readdir(groupRoot)).map((file) => readFile(path.join(groupRoot, file), 'utf8')))).join('\n')
    for (const id of [...transcriptIds, narrativeDockingImageId]) expect(generated).not.toContain(id)
    for (const id of archiveDockingImageIds) expect(generated).toContain(id)
    expect(archiveGroups.reduce((count, group) => count + group.count, 0)).toBe(105)
  })

  it('keeps the five unique Protein Docking photographs in the canonical source project only', async () => {
    const canonicalRoot = 'src/assets/minh-tam/source/Science research /2026 Protein Docking'
    await expect(Promise.all(['7381606024551.jpg', 'IMG_4206.JPG', 'IMG_4207.JPG', 'IMG_4208.JPG', 'IMG_4213.JPG'].map((file) => access(path.join(canonicalRoot, file))))).resolves.toBeDefined()
    await expect(access('src/assets/minh-tam/gallery/2026 Protein Docking')).rejects.toThrow()
  })

  it('publishes reviewed natural copy without generic archive labels or raw source paths', () => {
    const publicCopy = JSON.stringify(manifest.items.map((item: { metadata: unknown }) => item.metadata))
    expect(publicCopy).not.toMatch(/Archive record/i)
    expect(publicCopy).not.toContain('src/assets')
  })
})
