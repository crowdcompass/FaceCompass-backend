var express = require('express')
  , server = express()
  , db = require('./db.js')
  , concat = require('concat-stream')
  , bodyParser = require('body-parser')
  , _ = require('lodash')

var PORT = process.env.PORT || 1337

server.use(bodyParser())

server.get('/new', function (req, res) {
  db.selectAllFromTable('people', function (stream) {
    stream.pipe(concat(function (arr) {
      // Grab 10 random people to use as questions
      var result = _.shuffle(arr).slice(0, 10)

      result.map(function (question) {
        // Snag 3 random wrong answers
        var people = _.shuffle(arr).filter(function (person) {
          return person.name !== question.name
        }).slice(0, 3)

        people.push(question) // Add the right answer
        question.choices = people.map(function (person) { return person.name }) // Set choices as names
        
        // Shuffle the choices
        question.choices = _.shuffle(question.choices)
      })

      res.send(result)
    }))
  })
})

server.get('/score/all', function (req, res) {
  db.selectAllFromTable('scores', function (stream) {
    stream.pipe(concat(function (arr) {
      res.send(arr)
    }))
  })
})

server.post('/score/new', function (req, res) {
  db.insertRecordIntoTable(req.body, 'scores', function (err) {
    if (err) res.send(400, String(err))
    else res.send(200)
  })
})

// Start the server
server.listen(PORT)
console.log('Listening on ' + PORT)
