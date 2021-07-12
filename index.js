const express = require('express')
const next = require('next');
const PORT = process.env.PORT || 3000;
const http = require('http');
const socketio = require('socket.io');
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = app.getRequestHandler()

io.on('connect', socket => {
  socket.emit("hello", "hello world!")
});

nextApp.prepare().then(() => {
  app.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(PORT, (err) => {
    if (err) throw err
  })
})