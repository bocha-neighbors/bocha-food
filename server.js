var Express = require('express')
var knex = require('./db/knex')
var bodyParser = require('body-parser')

var items = require('./routes/items')
var users = require('./routes/users')
var auth = require('./routes/auth')

var app = Express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/v1/items', items)
app.use('/api/v1/users', users)
app.use('/auth', auth)

app.get('/', function(request, response) {
  console.log(request)
  response.send('Hey, world!')
})

app.listen(8080, function() {
  console.log('Listening on 8080...')
})
