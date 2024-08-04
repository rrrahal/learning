import { runInterpreter } from './utils'
//TODO: Test throw error when there is no closing parenthesis

describe('The interpreter for grouping operations', () => {
  it('correct interprets arithmetic grouping expressions', () => {
    const sourceCode = '2 * (3 + 3)'

    const result = runInterpreter(sourceCode)

    expect(result[0]).toBe(12)
  })

  it('correctly interprets simple nested operation', () => {
    const sourceCode = '2 * (3 * (2 + 1))'

    const result = runInterpreter(sourceCode)

    expect(result[0]).toBe(18)
  })

  it('correct interprets nested grouping expressions', () => {
    const sourceCode = '2 * (3 * (2 + 1) + 3)'

    const result = runInterpreter(sourceCode)

    expect(result[0]).toBe(24)
  })

  it('correctly handles grouping boolean operators', () => {
    const sourceCode = '(true AND false) OR (false OR true)'

    const result = runInterpreter(sourceCode)

    expect(result[0]).toBe(true)
  })
})
