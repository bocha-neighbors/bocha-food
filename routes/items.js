var Express = require('express')
var router = Express.Router()
var knex  = require('../db/knex')

function Items() {
  return knex('items')
}

router.get('/', function(request, response) {
  Items().select()
  .then(function(results) {
    var jsonResponse = {}
    jsonResponse.links = { "self": "http://somehost.com/items" }
    jsonResponse.data = results
    response.json(jsonResponse)
  })
})

router.get('/:id', function(request, response) {
  Items().select()
  .where('id', request.params.id).first()
  .then(function(results) {
    var jsonResponse = {}
    jsonResponse.links = { "self": "http://somehost.com/items" }
    jsonResponse.data = results
    response.json(jsonResponse)
  })
})

router.post('/', function(request, response) {
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

router.put('/:id', function(request, response) {
  Items().where('id', request.params.id).update({
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
  })
  .then(function(results) {
    var jsonResponse = {}
    jsonResponse.links = { "self": "http://somehost.com/items" }
    jsonResponse.data = results
    response.json(jsonResponse)
  })
})

router.delete('/:id', function(request, response) {
  Items().where('id', request.params.id).del()
  .then(function(results) {
    var jsonResponse = {}
    jsonResponse.links = { "self": "http://somehost.com/items" }
    jsonResponse.data = results
    response.json(jsonResponse)
  })
})

module.exports = router
