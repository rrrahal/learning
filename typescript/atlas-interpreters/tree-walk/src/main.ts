import fs from 'node:fs'

import { Scanner } from './scanner'
import { Parser } from './parser'
const PATH_TO_EXAMPLES = '../../../atlas-lang/examples'

// FS reads the whole file to memory, I should consider streams later on
fs.readFile(`${PATH_TO_EXAMPLES}/sum_1.atlas`, 'utf8', (err, data) => {
  if (err) {
    console.error('Failed when parsing the file: ', err)
    return
  }
  const tokens = Scanner(data)
  console.log(tokens)
  // const AST = Parser(tokens)
})
