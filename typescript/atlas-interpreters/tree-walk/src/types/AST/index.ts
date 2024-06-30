/*
 * Type for the AST Nodes
 * This is supposed to be an 1:1 mapping of the context-free grammar
 */

export type ASTNode = ExprNode | EOF

type arithOperators = '+'

export enum NodeType {
  ExprNode = 'EXPRESSION',
  EOF = 'EOF',
  ArithOp = 'ArithOp'
}

export type ExprNode = {
  type: NodeType
  node: TermExp
}

export type TermExp = {
  right: LiteralNode
  left: LiteralNode
  operator: arithOperators
}

export type LiteralNode = {
  value: number
}

export type EOF = {
  type: NodeType.EOF
}
