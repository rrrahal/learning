/*  A Token is a semantical representation of the source code
    the type is self explanatory, the lexeme is the string value of the token,
    line and position refer back to the text file */

export type Token = {
  type: TokenType
  lexeme: string
  line: number
  position: number
  hasError: boolean
}

export enum TokenType {
  // Single Character Tokens
  PLUS = 'PLUS',
  MINUS = 'MINUS',
  STAR = 'STAR',
  SLASH = 'SLASH',
  OPEN_PARENTHESIS = 'OPEN_PARENTHESIS',
  CLOSE_PARENTHESIS = 'CLOSE_PARENTHESIS',

  // One or two characters tokens
  GREATER = 'GREATER',
  GREATER_THAN = 'GREATER_THAN',
  LESS = 'LESS',
  LESS_THAN = 'LESS_THAN',

  // Literals
  NUMBER = 'number',
  BOOLEAN = 'boolean'

  // Keywords
}
