import { Interpreter } from '../../interpreter'
import { Parser } from '../../parser'
import { Scanner } from '../../scanner'

export const runInterpreter = (sourceCode: string) => {
  const tokens = Scanner(sourceCode)
  const AST = Parser(tokens)
  return Interpreter(AST)
}
