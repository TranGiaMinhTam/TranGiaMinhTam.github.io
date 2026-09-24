import original0 from "../../../../assets/generated/minh-tam/document-preview/borsworth-scholarship-first-2-pages.pdf?url"
import preview0 from "../../../../assets/generated/minh-tam/pdf-first-page/asset-387e7a940cacfc2d6326-387e7a940cac-pdf-first-page.webp"
import original1 from "../../../../assets/generated/minh-tam/document-preview/worthgate-scholarship-first-2-pages.pdf?url"
import preview1 from "../../../../assets/generated/minh-tam/pdf-first-page/asset-dc6125151ef633adf31a-dc6125151ef6-pdf-first-page.webp"
import { asArchiveGroupId, asCanonicalAssetId, type ArchiveGroupData } from '../../archive.types'

export const archiveGroup = Object.freeze({
  id: asArchiveGroupId("scholarships"),
  label: "Scholarships",
  description: "Published scholarship offer documents.",
  order: 4,
  items: Object.freeze([
    Object.freeze({ kind: 'document', id: asCanonicalAssetId("asset-387e7a940cacfc2d6326"), title: "80% scholarship offer", caption: "Published document from the School Scholarship collection.", accessibilityText: "80% scholarship offer. Published document from the School Scholarship collection.", subcollection: "Scholarships", order: 23, originalHref: original0, originalMediaType: "application/pdf", previewHref: preview0, previewWidth: 1224, previewHeight: 1584 }),
    Object.freeze({ kind: 'document', id: asCanonicalAssetId("asset-dc6125151ef633adf31a"), title: "90% scholarship offer", caption: "Published document from the School Scholarship collection.", accessibilityText: "90% scholarship offer. Published document from the School Scholarship collection.", subcollection: "Scholarships", order: 96, originalHref: original1, originalMediaType: "application/pdf", previewHref: preview1, previewWidth: 1224, previewHeight: 1584 }),
  ]),
}) satisfies ArchiveGroupData
