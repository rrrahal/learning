import { Scanner } from '../../scanner'

describe('Scanner', () => {
  it('should generate the correct tokens for the basic one digit number', () => {
    const input = '1 + 1'

    const tokens = Scanner(input)

    expect(tokens).toMatchInlineSnapshot(`
      [
        {
          "hasError": false,
          "lexeme": "1",
          "line": 1,
          "position": 0,
          "type": "number",
        },
        {
          "hasError": false,
          "lexeme": "+",
          "line": 1,
          "position": 2,
          "type": "plus",
        },
        {
          "hasError": false,
          "lexeme": "1",
          "line": 1,
          "position": 4,
          "type": "number",
        },
      ]
    `)
  })

  it('return no tokens for an empty program', () => {
    const input = ''

    const tokens = Scanner(input)

    expect(tokens).toMatchInlineSnapshot(`[]`)
  })

  it('correctly tokenize numbers with more than one digit', () => {
    const input = '1234 4321'

    const tokens = Scanner(input)

    expect(tokens).toMatchInlineSnapshot(`
      [
        {
          "hasError": false,
          "lexeme": "1234",
          "line": 1,
          "position": 0,
          "type": "number",
        },
        {
          "hasError": false,
          "lexeme": "4321",
          "line": 1,
          "position": 5,
          "type": "number",
        },
      ]
    `)
  })

  it('correctly tokenize number operations', () => {
    const input = '+ - / *'

    const tokens = Scanner(input)

    expect(tokens).toMatchInlineSnapshot(`
      [
        {
          "hasError": false,
          "lexeme": "+",
          "line": 1,
          "position": 0,
          "type": "plus",
        },
        {
          "hasError": false,
          "lexeme": "-",
          "line": 1,
          "position": 2,
          "type": "minus",
        },
        {
          "hasError": false,
          "lexeme": "/",
          "line": 1,
          "position": 4,
          "type": "SLASH",
        },
        {
          "hasError": false,
          "lexeme": "*",
          "line": 1,
          "position": 6,
          "type": "STAR",
        },
      ]
    `)
  })

  it('throws an error token when the number is badly formed', () => {
    const input = '123abv'

    try {
      Scanner(input)
    } catch (e) {
      expect(e).toMatchInlineSnapshot(
        `[Error: Error when parsing number, malformed number in line 1 position 3]`
      )
    }
  })

  it('should correctly tokenize multiple lines', () => {
    const input = `1 + 1
2 * 2`

    const tokens = Scanner(input)

    expect(tokens).toMatchInlineSnapshot(`
      [
        {
          "hasError": false,
          "lexeme": "1",
          "line": 1,
          "position": 0,
          "type": "number",
        },
        {
          "hasError": false,
          "lexeme": "+",
          "line": 1,
          "position": 2,
          "type": "plus",
        },
        {
          "hasError": false,
          "lexeme": "1",
          "line": 1,
          "position": 4,
          "type": "number",
        },
        {
          "hasError": false,
          "lexeme": "2",
          "line": 2,
          "position": 0,
          "type": "number",
        },
        {
          "hasError": false,
          "lexeme": "*",
          "line": 2,
          "position": 2,
          "type": "STAR",
        },
        {
          "hasError": false,
          "lexeme": "2",
          "line": 2,
          "position": 4,
          "type": "number",
        },
      ]
    `)
  })
})
