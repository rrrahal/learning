interface IteratorSource<T> {
  [index: number]: T
  length: number
}

export const Iterator = <T>(
  source: IteratorSource<T>
): IteratorReturnType<T> => {
  const len = source.length
  let index = 0
  let line = 1
  let position = 0

  return {
    done: () => len <= index,
    next: () => {
      index = index + 1
      position += 1
    },
    get: () => {
      if (index < len) {
        return source[index]
      }
      throw new Error(`Fail trying to get on done iterator`)
    },
    peek: () => {
      if (index + 1 < len) {
        return source[index + 1]
      }
      return null
    },
    meta: () => ({
      line,
      position
    }),
    newLine: () => {
      line += 1
      position = -1
    }
  }
}

export type IteratorReturnType<T> = {
  done: () => boolean
  next: () => void
  get: () => T
  peek: () => T | null
  meta: () => { line: number; position: number }
  newLine: () => void
}
