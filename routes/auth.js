var Express = require('express')
var router = Express.Router()
var knex  = require('../db/knex')
var bcrypt = require('bcrypt')

function Users() {
  return knex('users')
}

router.post('/signup', function(request, response, next) {
  Users().where('username', request.body.username).first()
  .then(function(user) {
    if(!user) {
      var hash = bcrypt.hashSync(request.body.password, 8)
      Users().insert({
        username: request.body.username,
        password: hash
      }, 'id')
      .then(function(id) {
        request.session.regenerate(function() {
          request.session.user = id[0]
          response.send('Successfully logged in.')
        })
      })
    }
    else {
      response.status(409)
      response.send('You have already signed up. Please login.')
    }
  })
})

router.post('/login', function(request, response) {
  Users()
  .where({
    username: request.body.username
  }).first()
  .then(function(user) {
    if (user) {
      if (bcrypt.compareSync(request.body.password, user.password)) {
        request.session.regenerate(function() {
          request.session.user = user.id
          response.send('Successfully logged in.')
        })
      }
      else {
        response.send('User found, but password is incorrect.')
      }
    }
    else {
      response.send('User not found.')
    }
  })
})

router.get('/signout', function(request, response) {
  request.session.destroy(function() {
    response.send('Signed out.')
  })
})

module.exports = router
