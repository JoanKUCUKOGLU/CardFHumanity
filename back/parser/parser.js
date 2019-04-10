'use strict'
var xlsx = require('xlsx')
var fs = require('fs')
var _ = require('lodash')

var workbook = xlsx.readFile('./parser/Cards For Humanity.xlsx')
var blackCards = parseCards(workbook.Sheets['Black'], 'black')
var whiteCards = parseCards(workbook.Sheets['White'], 'white')

fs.writeFileSync('./cards/black.json', JSON.stringify(blackCards, null, 2))
fs.writeFileSync('./cards/white.json', JSON.stringify(whiteCards, null, 2))

/**
 * Parses an xlsx object and returns an array of card objects of one type
 * @param  {Object} sheet accesed via the Sheets property of a parsed xlsx object
 * @param  {String} color idealy 'white' or 'black'
 * @return {Array}        Array of Card Objects
 */
function parseCards (sheet, color) {
  // Keep Track of Current Pack
  var currentPack = ''

  // Remove useless !ref cell
  delete sheet['!ref']

  // Return array of Card Objects
  return _.reduce(sheet, function (cards, value, cell) {
    // Beginning of New Pack
    if (value.v.startsWith('Cards Against Humanity:')) {
      currentPack = value.v.slice(24)

    // Card Text
    // Create card object and push onto array
    } else if (cell.startsWith('A')) {
      cards.push({
        text: tidyString(value.v),
        pack: currentPack,
        color: color,
        rule: null
      })

    // Pick Rule
    // Apply Pick Rule to previous card
    } else if (cell.startsWith('B') && value.v !== 'Pick') {
      let lastCard = cards.pop()
      lastCard.rule = value.v
      cards.push(lastCard)
    }

    return cards
  }, [])
}

/**
 * Sets all blanks to 6 '_'s long and trims trailing whitespace
 * @param  {String} str ie: card text string
 * @return {String}     formatted string
 */
function tidyString (str) {
  if (typeof str === 'string') {
    return str.replace(/(__*)/g, '______').trim()
  }
}

module.exports = {
  parseCards,
  tidyString
}
