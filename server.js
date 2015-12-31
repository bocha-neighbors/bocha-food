var Express = require('express')
var knex = require('./db/knex')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')

var items = require('./routes/items')
var users = require('./routes/users')
var auth = require('./routes/auth')
var app = Express()

// express-session configuration
var sess = {
  secret: 'keyboard cat',
  cookie: {}
}

require('dotenv').load()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser(process.env.SECRET))
app.use(session(sess))

// Only allow signed-in users to see this section
app.use('/api/v1/', function(req, res, next) {
  console.log('The user:', req.session.user)
  if (req.session.user) {
    next()
  }
  else {
    req.session.error = 'Access denied'
    res.send('Not allowed.')
  }
})

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
