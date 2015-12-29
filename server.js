var Express = require('express')
var knex = require('./db/knex')

function Items() {
  return knex('items')
}

var app = Express()

app.get('/', function(request, response) {
  console.log(request)
  response.send('Hey, world!')
})

app.get('/catalog', function(request, response) {
  Items().select()
  .then(function(results) {
    console.log(results)
    response.json(results)
  })
})

app.listen(8080, function() {
  console.log('Listening on 8080...')
})
