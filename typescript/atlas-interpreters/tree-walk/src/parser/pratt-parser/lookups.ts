import { TokenType } from '@src/types/tokens'
import { match } from 'ts-pattern'

import { parseBinaryExpr, parsePrimaryExpr, parseGroupingExpr } from './index'

export enum bindingPower {
  DEFAULT = 0,
  LOGICAL,
  ADDITIVE,
  MULTIPLICATIVE,
  UNARY,
  CALL,
  GROUPING,
  PRIMARY
}

export const bp_lookup = (type: TokenType): number | never => {
  return match(type)
    .with(
      TokenType.OPEN_PARENTHESIS,
      TokenType.CLOSE_PARENTHESIS,
      () => bindingPower.DEFAULT
    )
    .with(TokenType.PLUS, TokenType.MINUS, () => bindingPower.ADDITIVE)
    .with(TokenType.SLASH, TokenType.STAR, () => bindingPower.MULTIPLICATIVE)
    .with(TokenType.NUMBER, TokenType.BOOLEAN, () => bindingPower.PRIMARY)
    .otherwise(() => {
      throw new Error(`Failed to get binding power of TokenType: ${type}`)
    })
}

export const nud_lookup = (type: TokenType) => {
  return match(type)
    .with(TokenType.NUMBER, () => parsePrimaryExpr)
    .with(TokenType.BOOLEAN, () => parsePrimaryExpr)
    .with(TokenType.OPEN_PARENTHESIS, () => parseGroupingExpr)
    .otherwise(() => undefined)
}

export const led_lookup = (type: TokenType) => {
  return match(type)
    .with(
      TokenType.PLUS,
      TokenType.MINUS,
      TokenType.STAR,
      TokenType.SLASH,
      () => parseBinaryExpr
    )
    .otherwise(() => undefined)
}
