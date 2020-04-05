var path = require('path')
var express = require('express')
var http = require('http')
var socketio = require('socket.io')
const debug = require('debug')('taboo:api')

const cards = require('./data.json')
let room

const dist = path.resolve(__dirname, '../../dist')
debug('Serving statics from %s', dist)

const app = express()
app.use(express.static(dist))

app.get(`/.well-known/acme-challenge/${process.env.LETSENCRYPT_CHALLENGE_FILE}`, (req, res) => {
  res.send(process.env.LETSENCRYPT_CHALLENGE_SECRET)
})

const server = http.createServer(app)
const io = socketio(server)

io.on('connection', function (socket) {
  debug('User connected')
  socket.on('disconnect', function () {
    debug('User disconnected')
  })

  socket.on('get_next_card', function (msg) {
    if (!Array.isArray(room) || !room.length) {
      console.info('round')
      room = cards.slice()
    }

    io.emit('update_card', room.pop())
    debug('Sent a card, %d left', room.length)
  })
})

const port = process.env.PORT
server.listen(port, function () {
  debug('Listening on port http://localhost:%d', port)
})
