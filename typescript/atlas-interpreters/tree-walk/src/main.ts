import fs from 'node:fs'
import { stdin } from 'node:process'

import { Scanner } from './scanner'
//import { Parser } from './parser'
const PATH_TO_EXAMPLES = '../../../atlas-lang/examples'

enum INTERPRETER_MODE {
  REPL = '--repl'
}

const readStaticExample = () => {
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
}

// TODO: There's possibly a better way to parse the args, maybe without adding too much deps? minimist?
const parseArgs = () => {
  const args = process.argv
  const first_arg = args[2]
  if (first_arg === INTERPRETER_MODE.REPL) {
    repl()
  } else {
    readStaticExample()
  }
}

const repl = () => {
  console.log('>>>')
  stdin.addListener('data', (data) => {
    const s = data.toString()

    const tokens = Scanner(s)
    console.log('>>>', tokens)
  })
}

parseArgs()
