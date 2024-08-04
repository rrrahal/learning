import { ParserIteratorType, parseExpr } from './index'
import { ExprNode, NodeType, LiteralNode, BinaryOp } from '@src/types/AST'
import { match } from 'ts-pattern'
import { TokenType } from '@src/types/tokens'

/*
 *  Primary Expr Handler
 *  Return the literal that represents primary data structures
 *  It also advances the parser
 *  E.g: numbers, booleans, identifiers, etc
 */

export const parsePrimaryExpr = (parser: ParserIteratorType): ExprNode => {
  const token = parser.advance()

  return match(token.type)
    .with(TokenType.NUMBER, () => {
      const literal = {
        type: NodeType.LiteralNode,
        token
      } as LiteralNode
      return {
        type: NodeType.ExprNode as NodeType.ExprNode,
        expression: literal
      }
    })
    .with(TokenType.BOOLEAN, () => {
      const literal = {
        type: NodeType.LiteralNode,
        token
      } as LiteralNode

      return {
        type: NodeType.ExprNode as NodeType.ExprNode,
        expression: literal
      }
    })
    .otherwise(() => {
      throw new Error(`Cannot parse primary Expr ${token}`)
    })
}

/*
 *  Binary Expression Handler
 *  Given a parser and a left node it parses the expression
 *  It also advances the parser
 * */

export const parseBinaryExpr = (
  parser: ParserIteratorType,
  leftNode: ExprNode,
  bp: number
): ExprNode => {
  const operatorToken = parser.advance()
  const right = parseExpr(parser, bp)

  const binaryExpr = {
    type: NodeType.BinaryOp,
    left: leftNode,
    right,
    operator: operatorToken.type
  } as BinaryOp

  return {
    type: NodeType.ExprNode,
    expression: binaryExpr
  }
}

/*
 * Grouping Expression Handler
 * It parses a group "(expr)"
 * It also skips the closing parenthesis
 */

export const parseGroupingExpr = (parser: ParserIteratorType): ExprNode => {
  // Skip the open parenthesis token
  parser.advance()
  // Resets the binding power
  const expr = parseExpr(parser, 0)

  if (
    !parser.hasTokens() ||
    parser.currentToken().type !== TokenType.CLOSE_PARENTHESIS
  ) {
    throw new Error(
      `Expecting closing parenthesis, found ${parser.currentToken().type}`
    )
  }
  parser.advance()

  return {
    type: NodeType.ExprNode,
    expression: expr
  }
}
