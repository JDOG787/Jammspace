const express = require('express')
const next = require('next');
const PORT = process.env.PORT || 3000;
const http = require('http');
const socketio = require('socket.io');
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { ApolloServer } = require("apollo-server-micro");
const typeDefs = require("./utils/schemas");
const resolvers = require("./utils/resolvers");

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

// const  apolloServer  =  new ApolloServer({  typeDefs,  resolvers  });



nextApp.prepare().then(() => {
  app.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(PORT, (err) => {
    if (err) throw err
  })
})

io.on('connection', socket => {
  socket.on('join-room', (roomID, userID) => {
  console.log("hi")
    socket.join(roomID)
    socket.to(roomID).emit('user-connected', userID)
  })
});