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
  PLUS = 'plus',
  MINUS = 'minus',
  STAR = 'STAR',
  SLASH = 'SLASH',

  // One or two characters tokens
  GREATER = 'greater',
  GREATER_THAN = 'greater_than',
  LESS = 'less',
  LESS_THAN = 'less_than',

  // Literals
  NUMBER = 'number'

  // Keywords
}
