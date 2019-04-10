'use strict'
const test = require('tape')
const { getAll, getAmount } = require('./cards.js')

test('getAll:', function (t) {
  var result1 = getAll('black')
  t.ok(Array.isArray(result1), 'returns an array')

  var result2 = getAll('black')
  t.notDeepEqual(result1, result2, 'shuffles results')

  t.end()
})
