import { Scanner } from '../../scanner'

describe('Scanner', () => {
  it('should scan a simple true token', () => {
    const input = 'true'

    const tokens = Scanner(input)

    expect(tokens).toMatchInlineSnapshot()
  })
})
