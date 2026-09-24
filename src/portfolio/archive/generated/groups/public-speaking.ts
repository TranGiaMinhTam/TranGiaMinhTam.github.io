import original0 from "../../../../assets/minh-tam/source/Public speaking/Debate.jpg?url"
import thumbnail0 from "../../../../assets/generated/minh-tam/thumbnail/asset-c7b4fac692d858f06b63-c7b4fac692d8-thumbnail.webp"
import { asArchiveGroupId, asCanonicalAssetId, type ArchiveGroupData } from '../../archive.types'

export const archiveGroup = Object.freeze({
  id: asArchiveGroupId("public-speaking"),
  label: "Public Speaking",
  description: "Debate and public-speaking activities.",
  order: 5,
  items: Object.freeze([
    Object.freeze({ kind: 'image', id: asCanonicalAssetId("asset-c7b4fac692d858f06b63"), title: "Debate", caption: "Photograph from the Public speaking collection.", accessibilityText: "Debate. Photograph from the Public speaking collection.", subcollection: "Public Speaking", order: 88, originalHref: original0, originalMediaType: "image/jpeg", thumbnailHref: thumbnail0, width: 466, height: 640 }),
  ]),
}) satisfies ArchiveGroupData
