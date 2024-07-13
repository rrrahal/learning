import {
  ASTNode,
  BinaryOp,
  ExprNode,
  LiteralNode,
  NodeType,
  TokenType
} from '@src/types'
import { match } from 'ts-pattern'

export const Interpreter = (AST: ASTNode[]) => {
  const values = AST.map((node) => interpret(node))
  return values
}

const interpret = (node: ASTNode): number => {
  return match(node)
    .with({ type: NodeType.BinaryOp }, (n) => binaryOp(n as BinaryOp))
    .with({ type: NodeType.LiteralNode }, (n) => literal(n as LiteralNode))
    .with({ type: NodeType.ExprNode }, (n: ExprNode) => interpret(n.expression))
    .otherwise(() => {
      console.log('>>> at node', node)
      throw new Error('Failed to interpret: unsupported node')
    })
}

const binaryOp = (node: BinaryOp) => {
  const left = interpret(node.left)
  const right = interpret(node.right)

  return match(node.operator)
    .with(TokenType.PLUS, () => left + right)
    .with(TokenType.MINUS, () => left - right)
    .with(TokenType.STAR, () => left * right)
    .with(TokenType.SLASH, () => left / right)
    .otherwise(() => {
      throw new Error('Failed to execute binary op')
    })
}

const literal = (node: LiteralNode) => {
  return Number(node.token.lexeme)
}
