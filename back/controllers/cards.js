'use strict'
const _ = require('lodash')
const db = require('../db/local.js')

function getAll (color) {
  return _.shuffle(db[color])
}

function getAmount (color, amount) {
  return _.sampleSize(db[color], amount)
}

// function * validate(color) {
//   if (!['black', 'white'].includes(color)) {
//     this.throw(500, `Internal Server Error: ${color} is not a valid card color.`)
//   }
// }

module.exports = {
  getAll,
  getAmount
}
