import { createHash } from 'node:crypto'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'

export class UnstableFileError extends Error {
  constructor() {
    super('FILE_CHANGED_DURING_HASH')
    this.name = 'UnstableFileError'
    this.code = 'FILE_CHANGED_DURING_HASH'
  }
}

export const hashFile = async (file) => {
  const before = await stat(file)
  if (!before.isFile()) throw new TypeError('HASH_INPUT_NOT_FILE')
  const hash = createHash('sha256')
  let bytesRead = 0
  await new Promise((resolve, reject) => {
    const stream = createReadStream(file)
    stream.on('data', (chunk) => {
      bytesRead += chunk.byteLength
      hash.update(chunk)
    })
    stream.on('error', reject)
    stream.on('end', resolve)
  })
  const after = await stat(file)
  if (before.size !== after.size || before.mtimeMs !== after.mtimeMs || bytesRead !== after.size) throw new UnstableFileError()
  return Object.freeze({ sha256: hash.digest('hex'), bytes: bytesRead })
}
