'use strict'
const fs = require('fs')

module.exports = {
  black: JSON.parse(fs.readFileSync('./cards/black.json').toString()),
  white: JSON.parse(fs.readFileSync('./cards/white.json').toString())
}
