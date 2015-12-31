var Express = require('express')
var router = Express.Router()
var knex  = require('../db/knex')

function Users() {
  return knex('users')
}

router.get('/', function(request, response) {
  Users().select()
  .then(function(results) {
    var jsonResponse = {}
    jsonResponse.links = { "self": "http://somehost.com/users" }
    jsonResponse.data = results
    response.json(jsonResponse)
  })
})

router.get('/:id', function(request, response) {
  Users().select()
  .where('id', request.params.id).first()
  .then(function(results) {
    var jsonResponse = {}
    jsonResponse.links = { "self": "http://somehost.com/users" }
    jsonResponse.data = results
    response.json(jsonResponse)
  })
})

router.put('/:id', function(request, response) {
  Users().where('id', request.params.id).update({

  })
  .then(function(results) {
    var jsonResponse = {}
    jsonResponse.links = { "self": "http://somehost.com/users" }
    jsonResponse.data = results
    response.json(jsonResponse)
  })
})

router.delete('/:id', function(request, response) {
  Users().where('id', request.params.id).del()
  .then(function(results) {
    var jsonResponse = {}
    jsonResponse.links = { "self": "http://somehost.com/users" }
    jsonResponse.data = results
    response.json(jsonResponse)
  })
})

module.exports = router
