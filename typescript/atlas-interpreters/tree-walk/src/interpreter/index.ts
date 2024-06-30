import { ASTNode, NodeType, TermExp } from '@src/types'
import { match, P } from 'ts-pattern'

export const Interpreter = (AST: ASTNode[]) => {
  const values = AST.map((node) => interpret(node))
  return values
}

const interpret = (node: ASTNode): number | null => {
  return match(node)
    .with({ type: NodeType.EOF }, () => null)
    .with({ type: NodeType.ExprNode }, (node) => expression(node.node))
    .with({ type: NodeType.ArithOp }, (node) => arithOp(node.node))
    .exhaustive()
}

const expression = (node: TermExp) => {
  return match(node)
    .with(P.any, (node) => arithOp(node))
    .exhaustive()
}

const arithOp = (node: TermExp) => {
  const left = node.left.value
  const right = node.right.value

  return match(node.operator)
    .with('+', () => left + right)
    .exhaustive()
}
