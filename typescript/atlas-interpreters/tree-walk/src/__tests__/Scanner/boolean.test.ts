import { Scanner } from '../../scanner'

describe('Scanner', () => {
  it('should scan a simple true token', () => {
    const input = 'true'

    const tokens = Scanner(input)

    expect(tokens).toMatchInlineSnapshot(`
      [
        {
          "hasError": false,
          "lexeme": "true",
          "line": 1,
          "position": 0,
          "type": "boolean",
        },
      ]
    `)
  })
  it('should scan a simple false token', () => {
    const input = 'false'

    const tokens = Scanner(input)

    expect(tokens).toMatchInlineSnapshot(`
      [
        {
          "hasError": false,
          "lexeme": "false",
          "line": 1,
          "position": 0,
          "type": "boolean",
        },
      ]
    `)
  })
})
