export const Iterator = (source: string): IteratorReturnType => {
  const len = source.length
  let index = 0

  return {
    done: () => len < index,
    next: () => (index += 1),
    get: () => {
      if (index < len) {
        return source[index]
      }
      return null
    },
    peek: () => {
      if (index + 1 < len) {
        return source[index + 1]
      }
      return null
    }
  }
}

export type IteratorReturnType = {
  done: () => boolean
  next: () => void
  get: () => string | null
  peek: () => string | null
}
