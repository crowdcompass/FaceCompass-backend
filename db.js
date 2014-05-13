var pg = require('pg')
  , QueryStream = require('pg-query-stream')

var PG_URL = process.env.PG_URL

exports.selectAllFromTable = function (table, callback) {
  pg.connect(PG_URL, function (err, client, done) {
    if (err) throw err

    var query = new QueryStream('SELECT * FROM ' + table + ';')
      , stream = client.query(query)

    stream.on('end', done)

    callback(stream)
  })
}

exports.insertRecordIntoTable = function (record, table, callback) {
  pg.connect(PG_URL, function (err, client, done) {
    if (err) callback(err)
    
    client.query('INSERT INTO ' + table + ' (name, score) VALUES (\'' + record.name + '\', ' + record.score + ');', function (err, result) {
      if (err) callback(err)
      else {
        callback(null)
        done()
      }
    })
  })
}
