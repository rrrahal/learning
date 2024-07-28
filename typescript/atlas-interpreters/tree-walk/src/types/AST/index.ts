/*
 * Type for the AST Nodes
 * This is supposed to be an 1:1 mapping of the context-free grammar
 */

import { Token, TokenType } from '../tokens'

/*
 * Context Free Grammar for the Atlas syntax
 * ASTNode -> ExprNode | EOF  // Either an expression or the end of file, still don't have statements
 * ExprNode -> IntegerExpression
 * IntegerExpression -> IntegerTerm { ("+" | "-") IntegerTerm }
 * IntegerTerm -> IntegerFactor { ("*" | "/") IntegerFactor }
 * IntegerFactor -> NumberNode | "(" ExprNode ")"
 * NumberNode -> number
 */

/*
 *  1 + 1 -> ExprNode ->      BinaryOp
 *                    LiteralNode  Literal Node
 */

export type ASTTree = ASTNode[]

export enum NodeType {
  ExprNode = 'ExprNode',
  IntegerExpr = 'IntegerExpr',
  IntegerTerm = 'IntegerTerm',
  BinaryOp = 'BinaryOP',
  IntegerFactor = 'IntegerFactor',
  LiteralNode = 'LiteralNode',
  NumberNode = 'NumberNode',
  BooleanNode = 'BooleanNode',
  EOF = 'EOF'
}

export interface ASTNode {
  type: NodeType
}

export interface EOFNode {
  type: NodeType.EOF
}

export interface ExprNode extends ASTNode {
  type: NodeType.ExprNode
  expression: EOFNode | BinaryOp | ExprNode | LiteralNode
}

export interface BinaryOp extends ASTNode {
  type: NodeType.BinaryOp
  left: ExprNode | LiteralNode
  right: ExprNode
  // FIXME: Type narrowing here too
  operator: TokenType
}

// Fix ME: type narrowing here
export interface LiteralNode extends ASTNode {
  type: NodeType
  // TODO: Type narrowing here: Only Numbers for now
  // TODO: This should be the value already and not the token maybe?
  token: Token
}
