'use strict'
const app = require('koa')()
const router = require('koa-router')()
const Cards = require('./controllers/cards.js')

const port = process.argv[2]

router
  .get('/', function * (next) {
    this.body = 'Welcome to Cards For Humanity!'
  })
  .get('/:color/', async function (next) {
    var { color } = this.params
    this.body = await Cards.getAll(color)
  })
  .get('/:color/:amount', async function (next) {
    var { color, amount } = this.params
    this.body = await Cards.getAmount(color, amount)
  })

app.use(router.routes())

// listen on port 3000
console.log(`Listening on "http://localhost:${port}"`)
app.listen(port)
