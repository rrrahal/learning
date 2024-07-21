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
  const currentToken = parser.currentToken()

  const nud_handler = nud_lookup(currentToken.type)

  // This should be a token that does not expect anything to the left
  // E.g: A number
  if (!nud_handler) {
    throw new Error(`Failed to parse Expression ${currentToken.type}`)
  }

  // Return the node corresponding to the node and advances the parser
  let node = nud_handler(parser)

  // If my next token has bigger precedence: I have to keep parsing
  // because I'm not sure if I reached a "Top Level Node"
  // Eg: 1 + 2 * 3 (when I reach * I need to keep parsing because * binds more than +)
  while (
    parser.hasTokens() &&
    bp_lookup(parser.currentToken().type) > bindingPower
  ) {
    const tokenKind = parser.currentToken().type

    const led_fn = led_lookup(tokenKind)

    if (!led_fn) {
      throw new Error(`Failed to parse expression ${tokenKind}`)
    }

    // TODO: either rename this to handler or rename left handler
    node = led_fn(parser, node, bp_lookup(parser.currentToken().type))
  }

  return node
}

/*
 *  Primary Expr Handler
 *  Return the literal that represents primary data structures
 *  It also advances the parser
 *  E.g: numbers, booleans, identifiers, etc
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

/*
 *  Binary Expression Handler
 *  Given a parser and a left node it parses the expression
 *  It also advances the parser
 * */

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

/*
 * Grouping Expression Handler
 * It parses a group "(expr)"
 * It also skips the closing parenthesis
 */

export const parseGroupingExpr = (parser: prattType): ExprNode => {
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
