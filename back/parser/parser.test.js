'use strict'
var test = require('tape')
var _ = require('lodash')
var xlsx = require('xlsx')
var { parseCards, tidyString } = require('./parser.js')

/*
  xlsx
 */
test('xlsx module:', function (t) {
  var result = xlsx.readFile('./parser/Cards For Humanity.xlsx')
  var blackSheet = result.Sheets['Black']
  var whiteSheet = result.Sheets['White']

  t.equal(typeof result, 'object', 'returns object')
  t.equal(typeof blackSheet, 'object', 'has Black Sheet Object')
  t.equal(typeof whiteSheet, 'object', 'has White Sheet Object')
  t.end()
})

/*
  parseCards
 */
test('parseCards:', function (t) {
  var wkbk = xlsx.readFile('./parser/Cards For Humanity.xlsx')
  var allCards = parseCards(wkbk.Sheets['Black'], 'black')
    .concat(parseCards(wkbk.Sheets['White'], 'white'))

  // Returns Array
  t.ok(Array.isArray(allCards), 'returns array')

  // Sets Text property
  var setsText = _.every(allCards, function (card) {
    return typeof card.text === 'string'
  })
  t.ok(setsText, 'card.text is string')

  // Sets Pack property
  var setsPack = _.every(allCards, function (card) {
    return typeof card.pack === 'string'
  })
  t.ok(setsPack, 'card.pack is string')

  // Sets Color property
  var setsColor = _.every(allCards, function (card) {
    return (card.color === 'white' || card.color === 'black')
  })
  t.ok(setsColor, 'card.color is black or white')

  // Sets Rule property
  var pick2Exceptions = [
    'What\'s the next superhero/sidekick duo?',
    'What are two cards in your hand that you want to get rid of?'
  ]
  var setsRule = _.every(allCards, function (card) {
    let expectedRule = null
    // Determine expected rule based on # of blanks
    if (card.color === 'black') {
      let numBlanks = (card.text.match(/\b______\b/g) || []).length
      if (numBlanks === 2 || pick2Exceptions.includes(card.text)) {
        expectedRule = 'PICK 2'
      } else if (numBlanks === 3 || card.text === 'Make a haiku.') {
        expectedRule = 'DRAW 2, PICK 3'
      }
    }
    // Informs why test failed
    if (card.rule !== expectedRule) {
      t.comment(`
        Failed to set Rule:
          text: ${card.text}
          expected: ${expectedRule}
          returned: ${card.rule}
      `)
    }
    return card.rule === expectedRule
  })
  t.ok(setsRule, 'card.property is correctly set')

  t.end()
})

/*
  tidyString
 */
test('tidyString:', function (t) {
  var spaceResult = tidyString(' Hello World!  ')
  var spaceExpect = 'Hello World!'

  var blankResult = tidyString('___, so good, it will _________ your ____.')
  var blankExpect = '______, so good, it will ______ your ______.'

  var inputsResult = [
    tidyString(),
    tidyString(10),
    tidyString([1]),
    tidyString(null),
    tidyString({ key: 'value' })
  ]
  var inputsExpect = [undefined, undefined, undefined, undefined, undefined]

  t.equal(typeof spaceResult, 'string', 'returns a string')
  t.equal(spaceResult, spaceExpect, 'strips whitespace')
  t.equal(blankResult, blankExpect, 'fixes blanks')
  t.deepEqual(inputsResult, inputsExpect, 'returns undefined for non-strings')
  t.end()
})
