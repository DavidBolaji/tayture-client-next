const fs = require('fs')
const readline = require('readline')
const { execSync } = require('child_process')

const inputLessFilePath = './styles/antd.less'
const outputCSSFilePath = './styles/output.scss'
const outputSassVarsFilePath = './styles/sass-vars.scss'

execSync(`lessc --js ${inputLessFilePath} ${outputCSSFilePath}`)

function replace(line) {
  const str = line.trim()
  if (str.length < 2 || str[0] !== '@' || str.includes('import')) return
  return `$${str.substr(1)}`
}

const linereader = readline.createInterface({
  input: fs.createReadStream(inputLessFilePath),
})

fs.writeFileSync(outputSassVarsFilePath, '')

linereader.on('line', (line) => {
  const res = replace(line)
  if (res) {
    fs.appendFileSync(outputSassVarsFilePath, `${res}\n`)
  }
})
