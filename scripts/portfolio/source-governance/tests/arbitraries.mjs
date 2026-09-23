import fc from 'fast-check'

const hexadecimal = [...'0123456789abcdef']
export const contentHashArbitrary = fc.array(fc.constantFrom(...hexadecimal), { minLength: 64, maxLength: 64 }).map((characters) => characters.join(''))
const safeSegmentArbitrary = fc.array(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz0123456789-_'), { minLength: 1, maxLength: 16 }).map((characters) => characters.join(''))
export const safePathArbitrary = fc.tuple(safeSegmentArbitrary, safeSegmentArbitrary, fc.constantFrom('jpg', 'pdf', 'png')).map(([first, second, extension]) => `src/assets/minh-tam/${first}/${second}.${extension}`)

export const physicalAssetFactArbitrary = fc.record({
  relativePath: safePathArbitrary,
  sha256: contentHashArbitrary,
  bytes: fc.integer({ min: 1, max: 20 * 1024 * 1024 }),
  mediaType: fc.constantFrom('image/jpeg', 'image/png', 'application/pdf'),
}).map((value) => Object.freeze({
  ...value,
  id: `physical-${value.relativePath}`,
  sourceRelativePath: value.relativePath.replace('src/assets/minh-tam/', ''),
  category: value.relativePath.split('/')[3] ?? '_root',
  disposition: 'review-required',
}))

export const physicalInventoryArbitrary = fc.uniqueArray(physicalAssetFactArbitrary, {
  minLength: 0,
  maxLength: 60,
  selector: (value) => value.id,
})

export const findingArbitrary = fc.record({
  code: fc.constantFrom('U01-TEST-A', 'U01-TEST-B', 'U01-TEST-C'),
  severity: fc.constantFrom('blocking', 'warning'),
  target: safeSegmentArbitrary,
  message: fc.constant('Safe finding.'),
  resolution: fc.constant('Review the input.'),
})
