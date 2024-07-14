import { runInterpreter } from './utils'

describe('The interpreter on basic operations', () => {
  it('correctly returns a single number', () => {
    const sourceCode = '1'

    const result = runInterpreter(sourceCode)

    expect(result[0]).toBe(1)
  })
})
