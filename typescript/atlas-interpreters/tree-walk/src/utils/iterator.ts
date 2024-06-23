export const Iterator = (source: string): IteratorReturnType => {
  const len = source.length
  let index = 0
  let line = 1
  let position = 0

  return {
    done: () => len < index,
    next: () => {
      index = index + 1
      position += 1
    },
    get: () => {
      if (index < len) {
        return source[index]
      }
      return ''
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

export type IteratorReturnType = {
  done: () => boolean
  next: () => void
  get: () => string
  peek: () => string | null
  meta: () => { line: number; position: number }
  newLine: () => void
}
