var express = require('express');
var app = express();
var path = require('path');
var http = require('http').createServer(app);
var io = require('socket.io')(http)

http.listen(3002, () => {
  console.log('listening on *:3002')
})


io.on('connection', (socket) => {
  console.log(socket.id)

  socket.on('new message', (data) => {
    console.log(data)
    io.emit('receive message', data)
  })
})

io.on('disconnect', (socket) => {
  io.emit('user left', "A user has left.")
})