import type { IteratorReturnType } from '@utils/iterator'
import { OPERATOR, Token, TokenType } from '@src/types'

type LexerType = (source: IteratorReturnType) => Token | never

/* The Lexer Receives an Iterator and Returns the next Token in that Iterator
    It leaves the Iterator in the next character right after the token was parsed */

export const Lexer: LexerType = (source: IteratorReturnType) => {
  if (source.done()) {
    throw new Error('Error: Lexer called when all token were parsed')
  }

  // TODO: Fix the Iterator type to be always string in this case
  const currentChar = source.get() ?? ''

  if (currentChar === ' ') {
    while (source.get() === ' ') {
      source.next()
    }
  }

  if (!Number.isNaN(parseInt(currentChar))) {
    return getInteger(source)
  }
  if (
    currentChar === '+' ||
    currentChar === '-' ||
    currentChar === '/' ||
    currentChar === '*'
  ) {
    return getOperator(source)
  }

  throw new Error('Unsupported Operation')
}

const getInteger = (source: IteratorReturnType) => {
  let rawNumber: string = ''

  while (!source.done()) {
    const char = source.get()
    if (char === ' ') {
      return {
        type: TokenType.LITERAL,
        value: parseInt(rawNumber)
      }
    }
    rawNumber = rawNumber + char
    source.next()
  }
  return {
    type: TokenType.LITERAL,
    value: parseInt(rawNumber)
  }
}

const getOperator = (source: IteratorReturnType) => {
  const operator = source.get()
  const nextChar = source.peek()

  // TODO custom error type -> with code lines and such
  if (nextChar !== ' ') {
    throw new Error('Parse Error: Expected whitespace after operator')
  }

  source.next()

  switch (operator) {
    case '+':
      return {
        type: TokenType.OPERATOR,
        value: OPERATOR.SUM
      }
    case '-': {
      return {
        type: TokenType.OPERATOR,
        value: OPERATOR.MINUS
      }
    }
    case '/': {
      return {
        type: TokenType.OPERATOR,
        value: OPERATOR.DIVISION
      }
    }
    case '*': {
      return {
        type: TokenType.OPERATOR,
        value: OPERATOR.MULTIPLICATION
      }
    }
    default: {
      throw new Error('Unknown operator')
    }
  }
}
