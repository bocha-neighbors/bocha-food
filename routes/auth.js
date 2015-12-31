var Express = require('express')
var router = Express.Router()
var knex  = require('../db/knex')

function Users() {
  return knex('users')
}

router.post('/login', function(request, response) {
  Users()
  .where({
    username: request.body.username
  }).first()
  .then(function(user) {
    console.log(user)
    if (user) {
      response.cookie('userID', user.id)
      response.send('Found.')
    }
    else {
      response.send('No such user')
    }
  })
})

module.exports = router
