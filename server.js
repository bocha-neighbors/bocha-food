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

app.get('/items', function(request, response) {
  Items().select()
  .then(function(results) {
    var jsonResponse = {}
    jsonResponse.links = { "self": "http://somehost.com/items" }
    jsonResponse.data = results
    response.json(jsonResponse)
  })
})

app.get('/items/:id', function(request, response) {
  Items().select()
  .where('id', request.params.id).first()
  .then(function(results) {
    var jsonResponse = {}
    jsonResponse.links = { "self": "http://somehost.com/items" }
    jsonResponse.data = results
    response.json(jsonResponse)
  })
})

app.listen(8080, function() {
  console.log('Listening on 8080...')
})
