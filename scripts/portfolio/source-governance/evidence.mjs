import { mkdir, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'

export const canonicalizeValue = (value) => {
  if (Array.isArray(value)) return value.map(canonicalizeValue)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonicalizeValue(value[key])]))
  }
  return value
}

export const serializeCanonicalJson = (value) => `${JSON.stringify(canonicalizeValue(value), null, 2)}\n`

export const writeFileAtomically = async (target, bytes) => {
  await mkdir(path.dirname(target), { recursive: true })
  const temporary = `${target}.candidate-${process.pid}`
  try {
    await writeFile(temporary, bytes)
    await rename(temporary, target)
  } catch (error) {
    try {
      const { rm } = await import('node:fs/promises')
      await rm(temporary, { force: true })
    } finally {
      throw error
    }
  }
}

export const writeCanonicalJson = (target, value) => writeFileAtomically(target, serializeCanonicalJson(value))
