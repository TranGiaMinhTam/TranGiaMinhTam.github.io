import { lstat, realpath } from 'node:fs/promises'
import path from 'node:path'

const CONTROL_CHARACTER = /[\u0000-\u001f\u007f]/u

export class SafePathError extends Error {
  constructor(code) {
    super(code)
    this.name = 'SafePathError'
    this.code = code
  }
}

export const toPosixPath = (value) => value.split(path.sep).join('/')

export const normalizeRepositoryPath = (value) => {
  if (typeof value !== 'string' || value.length === 0) throw new SafePathError('PATH_EMPTY')
  if (CONTROL_CHARACTER.test(value)) throw new SafePathError('PATH_CONTROL_CHARACTER')
  const slashPath = value.replaceAll('\\', '/')
  if (path.posix.isAbsolute(slashPath) || path.win32.isAbsolute(value)) throw new SafePathError('PATH_ABSOLUTE')
  const normalized = path.posix.normalize(slashPath)
  if (normalized === '..' || normalized.startsWith('../') || normalized.split('/').includes('..')) throw new SafePathError('PATH_TRAVERSAL')
  if (normalized === '.' || normalized.startsWith('./')) throw new SafePathError('PATH_AMBIGUOUS')
  return normalized
}

export const isWithinRoot = (root, candidate) => {
  const relative = path.relative(path.resolve(root), path.resolve(candidate))
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative))
}

export const resolveWithinRoot = (root, relative) => {
  const normalized = normalizeRepositoryPath(relative)
  const resolved = path.resolve(root, ...normalized.split('/'))
  if (!isWithinRoot(root, resolved)) throw new SafePathError('PATH_ROOT_ESCAPE')
  return Object.freeze({ normalized, resolved })
}

export const verifyExistingPathWithinRoot = async (root, candidate) => {
  const resolvedRoot = await realpath(root)
  const resolvedCandidate = await realpath(candidate)
  if (!isWithinRoot(resolvedRoot, resolvedCandidate)) throw new SafePathError('PATH_SYMLINK_ESCAPE')
  const info = await lstat(candidate)
  if (info.isSymbolicLink()) throw new SafePathError('PATH_SYMBOLIC_LINK')
  return Object.freeze({ resolvedRoot, resolvedCandidate, info })
}

export const safeRelativeTarget = (workspaceRoot, candidate) => {
  if (!isWithinRoot(workspaceRoot, candidate)) return 'outside-approved-root'
  return normalizeRepositoryPath(toPosixPath(path.relative(workspaceRoot, candidate)))
}
