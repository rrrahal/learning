import fs from 'node:fs'

import { Parser } from './parser'
const PATH_TO_EXAMPLES = '../../../atlas-lang/examples'

// FS reads the whole file to memory, I should consider streams later on
fs.readFile(`${PATH_TO_EXAMPLES}/sum_1.atlas`, 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const tokens = Parser(data)
  console.log('Tokens: ', tokens)
})
