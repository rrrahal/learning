import {
  NodeType,
  ASTNode,
  Token,
  TokenType,
  BinaryOp,
  ASTTree,
  ExprNode,
  LiteralNode
} from '@src/types'
import { Iterator, IteratorReturnType } from '@utils/iterator'
import { match, P } from 'ts-pattern'

/*
 * Context Free Grammar for the Atlas syntax
 * ASTNode -> ExprNode | EOF  // Either an expression or the end of file, still don't have statements
 * ExprNode -> IntegerExpression
 * IntegerExpression -> IntegerTerm { ("+" | "-") IntegerTerm }
 * IntegerTerm -> IntegerFactor { ("*" | "/") IntegerFactor }
 * IntegerFactor -> NumberNode | "(" ExprNode ")"
 * NumberNode -> number
 */

/* Basic example (happy path): 1 + 1 * 2
 */

type tokenIterator = IteratorReturnType<Token>

export const Parser = (tokens: Token[]): ASTTree => {
  const iter = Iterator<Token>(tokens)
  const ast: ASTNode[] = []

  const topLevelNode = ParseExpr(iter)

  ast.push(topLevelNode)

  return ast
}

const ParseExpr = (iter: tokenIterator): ASTNode => {
  if (iter.done()) {
    throw new Error('Failed to parse, unexpected token')
  }
  const currentToken = iter.get()
  const lookahead = iter.peek()

  return match(lookahead)
    .with({ type: TokenType.MINUS }, { type: TokenType.PLUS }, () => {
      return binaryOp(iter)
    })
    .with(P._, () => {
      throw new Error(
        `Failed to parse expression at ${currentToken.line} pos: ${currentToken.position}`
      )
    })
    .exhaustive()
}

const ParseToken = (token: Token): ExprNode => {
  const currentNode = match(token)
    .with({ type: TokenType.NUMBER }, (token) => parseLiteral(token))
    .with(P.string, () => {
      throw new Error(
        `Failed to parse at line ${token.line} pos: ${token.position}`
      )
    })
    .with(P.any, () => {
      throw new Error(
        `Failed to parse at line ${token.line} pos: ${token.position} - Token not supported`
      )
    })
    .exhaustive()

  return {
    type: NodeType.ExprNode,
    expression: currentNode
  }
}

const binaryOp = (iter: tokenIterator): BinaryOp => {
  const left = iter.get()
  iter.next()

  const operator = iter.get()
  iter.next()

  const right = iter.get()
  iter.next()

  return {
    type: NodeType.BinaryOp,
    left: ParseToken(left),
    right: ParseToken(right),
    operator: match(operator)
      .with({ type: P.when(isBinaryOP) }, (opType) => opType.type)
      .otherwise(() => {
        throw new Error('Error when getting binary op operator')
      })
  }
}

const parseLiteral = (token: Token): LiteralNode => {
  return match(token)
    .with({ type: TokenType.NUMBER }, (token) => ({
      type: NodeType.LiteralNode,
      token
    }))
    .with(P._, () => {
      throw new Error(
        `Failed to parse, expecting literal at line ${token.line} pos: ${token.position}`
      )
    })
    .exhaustive()
}

const isBinaryOP = (type: TokenType) => {
  return match(type)
    .with(
      TokenType.PLUS,
      TokenType.MINUS,
      TokenType.STAR,
      TokenType.SLASH,
      () => true
    )
    .with(P.any, () => false)
}
