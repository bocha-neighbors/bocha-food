var Express = require('express')
var knex = require('./db/knex')
var bodyParser = require('body-parser')

function Items() {
  return knex('items')
}

var app = Express()

app.use(bodyParser.urlencoded({ extended: false }))

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

app.post('/items', function(request, response) {
  Items().insert({
    vendor: request.body.vendor,
    item_type: request.body.item_type,
    vendor_item_id: request.body.vendor_item_id,
    company: request.body.company,
    item_description: request.body.item_description,
    quantity: parseFloat(request.body.quantity),
    unit: request.body.unit,
    price: parseFloat(request.body.price),
    unit_price: parseFloat(request.body.unit_price),
    typical_origin: request.body.typical_origin,
    wholesale_unit: request.body.wholesale_unit,
    wholesale_unit_price: parseFloat(request.body.wholesale_unit_price)
  }, 'id')
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
