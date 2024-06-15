import { Iterator } from '@utils/iterator'
import type { Token } from '@src/types'
import { Lexer } from './lexer'

export const Parser = (file: string) => {
  const iter = Iterator(file)
  const tokens: Token[] = []

  while (!iter.done()) {
    try {
      const nextToken = Lexer(iter)
      tokens.push(nextToken)
      iter.next()
    } catch (e) {
      console.error('Parser Error: Failed to parse source code', e)
      break
    }
  }

  return tokens
}
