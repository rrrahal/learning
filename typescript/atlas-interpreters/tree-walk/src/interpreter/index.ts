import {
  ASTNode,
  BinaryOp,
  ExprNode,
  LiteralNode,
  NodeType,
  TokenType
} from '@src/types'
import { match, P } from 'ts-pattern'

export const Interpreter = (AST: ASTNode[]) => {
  const values = AST.map((node) => interpret(node))
  return values
}

const interpret = (node: ASTNode): number | boolean => {
  return match(node)
    .with({ type: NodeType.BinaryOp }, (n) => binaryOp(n as BinaryOp))
    .with({ type: NodeType.LiteralNode }, (n) => literal(n as LiteralNode))
    .with({ type: NodeType.ExprNode }, (n: ExprNode) => interpret(n.expression))
    .otherwise(() => {
      throw new Error('Failed to interpret: unsupported node')
    })
}

const binaryOp = (node: BinaryOp): number | boolean => {
  const left = interpret(node.left)
  const right = interpret(node.right)

  // TODO: simplify this, re-use code
  // Maybe separate the file?
  return match(node.operator)
    .with(TokenType.PLUS, () => {
      return match([left, right])
        .with([P.number.int(), P.number.int()], ([l, r]) => {
          return l + r
        })
        .otherwise(() => {
          throw new Error('Failed to sum two values: they are not numbers')
        })
    })
    .with(TokenType.MINUS, () => {
      return match([left, right])
        .with([P.number.int(), P.number.int()], ([l, r]) => {
          return l - r
        })
        .otherwise(() => {
          throw new Error('Failed to subtract two values: they are not numbers')
        })
    })
    .with(TokenType.STAR, () => {
      return match([left, right])
        .with([P.number.int(), P.number.int()], ([l, r]) => {
          return l * r
        })
        .otherwise(() => {
          throw new Error('Failed to multiply two values: they are not numbers')
        })
    })
    .with(TokenType.SLASH, () => {
      return match([left, right])
        .with([P.number.int(), P.number.int()], ([l, r]) => {
          return l / r
        })
        .otherwise(() => {
          throw new Error('Failed to divide two values: they are not numbers')
        })
    })
    .with(TokenType.AND_OPERATOR, () => {
      return match([left, right])
        .with([P.boolean, P.boolean], ([l, r]) => {
          return l && r
        })
        .otherwise(() => {
          throw new Error(
            'Failed to apply and operator: values are not booleans'
          )
        })
    })
    .with(TokenType.OR_OPERATOR, () => {
      return match([left, right])
        .with([P.boolean, P.boolean], ([l, r]) => {
          return l || r
        })
        .otherwise(() => {
          throw new Error(
            'Failed to apply and operator: values are not booleans'
          )
        })
    })
    .otherwise(() => {
      throw new Error('Failed to execute binary op')
    })
}

const literal = (node: LiteralNode): boolean | number => {
  return match(node.token)
    .with({ type: TokenType.NUMBER }, (token) => Number(token.lexeme))
    .with({ type: TokenType.BOOLEAN }, (token) =>
      Boolean(token.lexeme === 'true' ? true : false)
    )
    .otherwise(() => {
      throw new Error(`Failed to interpret literal node ${node}`)
    })
}
