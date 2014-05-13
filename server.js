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
      // Randomize all
      var result = _.shuffle(arr).slice(0, 10)

      // Add choices
      result.map(function (question) {
        // Grab 3 random wrong answers
        var people = _.shuffle(arr).filter(function (person) {
          return person.name !== question.name
        }).slice(0, 3)

        // Add the right answer
        people.push(question)

        // Set choices as names
        question.choices = people.map(function (person) {
          return person.name
        })
        
        // Shuffle the choices
        question.choices = _.shuffle(question.choices)
      })

      res.set('Content-Type', 'text/json')
      res.send(JSON.stringify(result))
    }))
  })
})

server.get('/score/all', function (req, res) {
  db.selectAllFromTable('scores', function (stream) {
    stream.pipe(concat(function (arr) {
      res.set('Content-Type', 'text/json')
      res.send(JSON.stringify(arr))
    }))
  })
})

server.post('/score/new', function (req, res) {
  db.insertRecordIntoTable(req.body, 'scores', function (err) {
    res.set('Content-Type', 'text/plain')
    if (err) res.send(400, String(err))
    else res.send(200)
  })
})

server.listen(PORT)
console.log('Listening on ' + PORT)
