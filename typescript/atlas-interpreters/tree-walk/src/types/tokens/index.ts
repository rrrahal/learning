export type Token = {
  type: TokenType
  value: TokenValue
}

export enum TokenType {
  LITERAL = 'literal',
  OPERATOR = 'operator',
  BOOLEAN = 'boolean'
}

export type TokenValue = boolean | number | OPERATOR

export enum OPERATOR {
  SUM = '+',
  MINUS = '-',
  MULTIPLICATION = '*',
  DIVISION = '/'
}
