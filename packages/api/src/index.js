var path = require('path')
var express = require('express')
var http = require('http')
var socketio = require('socket.io')

const cards = require('./data.json')
let room

const app = express()

app.use(express.static(
  path.join(__dirname, 'public_html')
))

const server = http.createServer(app)
const io = socketio(server)

io.on('connection', function (socket) {
  console.log('a user connected')
  socket.on('disconnect', function () {
    console.log('user disconnected')
  })

  socket.on('chat message', function (msg) {
    console.log('message: ' + msg)
    io.emit('chat message', msg)
  })

  socket.on('get_next_card', function (msg) {
    if (!Array.isArray(room) || !room.length) {
      console.info('round')
      room = cards.slice()
    }

    io.emit('update_card', room.pop())
    console.info(room.length)
  })
})

server.listen(3000, function () {
  console.log('listening on *:3000')
})
