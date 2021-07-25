const express = require('express');
const http = require('http');
const next = require('next');
const socketio = require('socket.io');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

// const  apolloServer  =  new ApolloServer({  typeDefs,  resolvers  });
// const { ApolloServer } = require("apollo-server-micro");
// const typeDefs = require("./utils/schemas");
// const resolvers = require("./utils/resolvers");

nextApp.prepare().then(() => {
	const app = express()
	const server = require('http').Server(app);
	const io = new socketio.Server();
	io.attach(server);

	app.get('/hello', async (req, res) => {
		res.send('Hello World')
	});

	io.on('connection', (socket) => {
		console.log('connection');
		socket.emit('status', 'Hello from Socket.io');

		socket.on('join-room', (roomID, userID) => {
			console.log("hi")
			socket.join(roomID)
			socket.to(roomID).emit('user-connected', userID)
		})

		socket.on('disconnect', () => {
			console.log('client disconnected');
		});
	});

	app.all('*', (req, res) => nextHandler(req, res));

	server.listen(port, () => {
		console.log(`> Ready on Port: ${port}`);
	});
})