import {
  ASTNode,
  ASTTree,
  BinaryOp,
  ExprNode,
  LiteralNode,
  NodeType
} from '@src/types/AST'
import { Token, TokenType } from '@src/types/tokens'
import { nud_lookup, led_lookup, bp_lookup } from './lookups'
import { match } from 'ts-pattern'

type prattType = ReturnType<typeof PrattParser>

const PrattParser = (tokens: Token[]) => {
  let position = 0

  return {
    currentToken: () => tokens[position],
    advance: () => {
      const token = tokens[position]
      position++
      return token
    },
    hasTokens: () => {
      return position < tokens.length
    }
  }
}

export const Parser = (tokens: Token[]): ASTTree => {
  const prattParser = PrattParser(tokens)
  const ast: ASTNode[] = []

  while (prattParser.hasTokens()) {
    ast.push(parseExpr(prattParser, 0))
  }

  return ast
}

const parseExpr = (parser: prattType, bindingPower: number) => {
  // TODO: maybe this could throw!
  const leftToken = parser.currentToken()

  const leftHandler = nud_lookup(leftToken.type)

  if (!leftHandler) {
    throw new Error(`Failed to parse Expression ${leftToken}`)
  }

  let leftNode = leftHandler(parser)
  while (
    parser.hasTokens() &&
    bp_lookup(parser.currentToken().type) > bindingPower
  ) {
    const tokenKind = parser.currentToken().type

    const led_fn = led_lookup(tokenKind)

    if (!led_fn) {
      throw new Error(`Failed to parse expression ${tokenKind}`)
    }

    leftNode = led_fn(parser, leftNode, bp_lookup(parser.currentToken().type))
  }

  return leftNode
}

/* Handlers
  They parse the current token and advance the parser to the next token
 */

export const parsePrimaryExpr = (parser: prattType): ExprNode => {
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
    .otherwise(() => {
      throw new Error(`Cannot parse primary Expr ${token}`)
    })
}

export const parseBinaryExpr = (
  parser: prattType,
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
