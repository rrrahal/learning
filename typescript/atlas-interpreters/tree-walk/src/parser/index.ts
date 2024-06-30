import {
  ASTNode,
  TokenType,
  ExprNode,
  NodeType,
  type Token,
  type LiteralNode,
  type EOF
} from '@src/types'
import { Iterator, IteratorReturnType } from '@utils/iterator'
import { match, P } from 'ts-pattern'

export const Parser = (tokens: Token[]) => {
  const iter = Iterator<Token>(tokens)
  const ast: ASTNode[] = []

  while (!iter.done()) {
    const lookahead = iter.peek()
    const node: ASTNode = match(lookahead)
      .with(P.string, () => {
        throw new Error('Unexpected Stuff')
      })
      .with(null, () => createEOF())
      .with({ type: TokenType.PLUS }, () => createArithNode(iter))
      .with(P.any, () => {
        throw new Error('Not supported yet')
      })
      .exhaustive()

    ast.push(node)
  }

  return ast
}

const createEOF = (): EOF => {
  return { type: NodeType.EOF }
}

const createArithNode = (iter: IteratorReturnType<Token>): ExprNode => {
  const left = getLiteral(iter)
  iter.next()
  iter.next()
  const right = getLiteral(iter)
  iter.next()
  return {
    type: NodeType.ExprNode,
    node: {
      left,
      right,
      operator: '+'
    }
  }
}

const getLiteral = (iter: IteratorReturnType<Token>): LiteralNode => {
  // Gets the literal from the current node and moves the iterator
  const token = iter.get()

  const result = match(token)
    .with(P.string, () => ({ value: 0 }))
    .with({ lexeme: P.any }, (token) => ({ value: Number(token.lexeme) }))
    .exhaustive()

  return result
}
