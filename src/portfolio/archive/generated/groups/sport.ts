import original0 from "../../../../assets/minh-tam/source/Sport/Soccer.jpg?url"
import thumbnail0 from "../../../../assets/generated/minh-tam/thumbnail/asset-65e5f1a39e01e6f3ba7f-65e5f1a39e01-thumbnail.webp"
import original1 from "../../../../assets/minh-tam/source/Sport/Badminton.pdf?url"
import preview1 from "../../../../assets/generated/minh-tam/pdf-first-page/asset-daebfb751989aab34b6c-daebfb751989-pdf-first-page.webp"
import { asArchiveGroupId, asCanonicalAssetId, type ArchiveGroupData } from '../../archive.types'

export const archiveGroup = Object.freeze({
  id: asArchiveGroupId("sport"),
  label: "Sport",
  description: "Sport participation and achievement records.",
  order: 6,
  items: Object.freeze([
    Object.freeze({ kind: 'image', id: asCanonicalAssetId("asset-65e5f1a39e01e6f3ba7f"), title: "Soccer", caption: "Photograph from the Sport collection.", accessibilityText: "Soccer. Photograph from the Sport collection.", subcollection: "Sport", order: 49, originalHref: original0, originalMediaType: "image/jpeg", thumbnailHref: thumbnail0, width: 640, height: 434 }),
    Object.freeze({ kind: 'document', id: asCanonicalAssetId("asset-daebfb751989aab34b6c"), title: "Badminton achievement certificate", caption: "Published document from the Sport collection.", accessibilityText: "Badminton achievement certificate. Published document from the Sport collection.", subcollection: "Sport", order: 95, originalHref: original1, originalMediaType: "application/pdf", previewHref: preview1, previewWidth: 1600, previewHeight: 1132 }),
  ]),
}) satisfies ArchiveGroupData
