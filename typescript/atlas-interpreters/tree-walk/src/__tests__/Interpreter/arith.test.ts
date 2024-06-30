import { runInterpreter } from './utils'

describe('The interpreter for arith operations', () => {
  it('correctly returns for single digit sum', () => {
    const sourceCode = '1 + 1'

    const result = runInterpreter(sourceCode)

    expect(result[0]).toBe(2)
  })

  it('correctly return for multiple digit sum', () => {
    const sourceCode = '102 + 1000'

    const result = runInterpreter(sourceCode)

    expect(result[0]).toBe(1102)
  })
})
