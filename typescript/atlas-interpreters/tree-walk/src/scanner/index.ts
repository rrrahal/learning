import { Token, TokenType } from '@src/types'
import { Iterator, IteratorReturnType } from '@utils/iterator'

export const Scanner = (source: string): Token[] => {
  const iter = Iterator<string>(source)
  const tokens: Token[] = []
  const getToken = tokenCreator(iter)

  while (!iter.done()) {
    const char = iter.get()
    switch (char) {
      case '\r':
      case '\t':
      case '':
      case ' ': {
        break
      }
      case '\n': {
        iter.newLine()
        break
      }
      case '+': {
        tokens.push(getToken(TokenType.PLUS))
        break
      }
      case '-': {
        tokens.push(getToken(TokenType.MINUS))
        break
      }
      case '/': {
        tokens.push(getToken(TokenType.SLASH))
        break
      }
      case '*': {
        tokens.push(getToken(TokenType.STAR))
        break
      }
      case '(': {
        tokens.push(getToken(TokenType.OPEN_PARENTHESIS))
        break
      }
      case ')': {
        tokens.push(getToken(TokenType.CLOSE_PARENTHESIS))
        break
      }
      case 't': {
        if (iter.match('true')) {
          tokens.push(getBoolean(iter))
        }
        // TODO: This is an identifier
        break
      }
      case 'f': {
        if (iter.match('false')) {
          tokens.push(getBoolean(iter))
        }
        // TODO: this is an identifier
        break
      }
      case 'A': {
        if (iter.match('AND')) {
          tokens.push(getLogical(iter))
        }
        // TODO: This is an identifier
        break
      }
      case 'O': {
        if (iter.match('OR')) {
          tokens.push(getLogical(iter))
        }
        // TODO: this is an OR expression
        break
      }
      default: {
        if (isNumber(char)) {
          const token = number(iter)
          if (token.hasError) {
            throw new Error(
              `Error when parsing number, malformed number in line ${token.line} position ${token.position}`
            )
          }
          tokens.push(token)
          break
        }
        console.log('[LOG] Char ignored: ', char, iter)
      }
    }
    iter.next()
  }

  return tokens
}

const tokenCreator = (iter: IteratorReturnType<string>) => (type: TokenType) =>
  createToken(iter, type)

const createToken = (
  iter: IteratorReturnType<string>,
  type: TokenType
): Token => ({
  type,
  lexeme: iter.get(),
  line: iter.meta().line,
  position: iter.meta().position,
  hasError: false
})

const number = (iter: IteratorReturnType<string>): Token => {
  const { line, position } = iter.meta()
  let rawNumber = iter.get()
  while (!iter.done() && !isEndOfExpression(iter.peek() ?? '')) {
    iter.next()
    if (!isNumber(iter.get())) {
      return {
        type: TokenType.NUMBER,
        lexeme: rawNumber,
        line,
        position: iter.meta().position,
        hasError: true
      }
    }
    rawNumber += iter.get()
  }

  return {
    type: TokenType.NUMBER,
    lexeme: rawNumber,
    line,
    position,
    hasError: false
  }
}

const isNumber = (s: string) => {
  const n = Number(s)
  return !isNaN(n)
}

const isEndOfExpression = (c: string) => {
  return (
    c === ' ' || c === '\n' || c === '\t' || c === '\r' || c == '' || c == ')'
  )
}

const getBoolean = (iter: IteratorReturnType<string>): Token => {
  if (iter.get() === 't') {
    const { line, position } = iter.meta()
    iter.next()
    iter.next()
    iter.next()
    return {
      type: TokenType.BOOLEAN,
      lexeme: 'true',
      line,
      position,
      hasError: false
    }
  } else {
    const { line, position } = iter.meta()
    iter.next()
    iter.next()
    iter.next()
    iter.next()
    return {
      type: TokenType.BOOLEAN,
      lexeme: 'false',
      line,
      position,
      hasError: false
    }
  }
}

const getLogical = (iter: IteratorReturnType<string>): Token => {
  const { line, position } = iter.meta()
  if (iter.get() === 'A') {
    iter.next()
    iter.next()

    return {
      type: TokenType.AND_OPERATOR,
      lexeme: 'and',
      line,
      position,
      hasError: false
    }
  }

  iter.next()

  return {
    type: TokenType.OR_OPERATOR,
    lexeme: 'or',
    line,
    position,
    hasError: false
  }
}
