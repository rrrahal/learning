import { runInterpreter } from './utils'

describe('The interpreter on logical operations', () => {
  it('correctly returns the value of an AND expression', () => {
    const sourceCode = 'true AND true'

    const result = runInterpreter(sourceCode)

    expect(result[0]).toBe(true)
  })

  it('correctly returns the value of an OR expression', () => {
    const sourceCode = 'true OR false'

    const result = runInterpreter(sourceCode)

    expect(result[0]).toBe(true)
  })

  it('correctly returns the value of a AND expression', () => {
    const sourceCode = 'false AND false'

    const result = runInterpreter(sourceCode)

    expect(result[0]).toBe(false)
  })

  it('correctly returns the value of a AND expression', () => {
    const sourceCode = 'false AND false'

    const result = runInterpreter(sourceCode)

    expect(result[0]).toBe(false)
  })

  it('correctly returns the value of a AND expression', () => {
    const sourceCode = 'false OR false'

    const result = runInterpreter(sourceCode)

    expect(result[0]).toBe(false)
  })
})
