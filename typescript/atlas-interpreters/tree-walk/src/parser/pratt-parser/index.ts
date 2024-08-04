import { ASTNode, ASTTree } from '@src/types/AST'
import { Token } from '@src/types/tokens'
import { nud_lookup, led_lookup, bp_lookup } from './lookups'

export type ParserIteratorType = ReturnType<typeof PrattParserIterator>

const PrattParserIterator = (tokens: Token[]) => {
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
  const prattParser = PrattParserIterator(tokens)
  const ast: ASTNode[] = []

  while (prattParser.hasTokens()) {
    ast.push(parseExpr(prattParser, 0))
  }

  return ast
}

export const parseExpr = (parser: ParserIteratorType, bindingPower: number) => {
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
