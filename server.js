const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 3000;

app.use(express.json());

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('login', (data) => {
        // Handle user login here
    });

    socket.on('gameCode', (data) => {
        // Handle game code generation here
    });

    socket.on('playerInput', (data) => {
        // Handle player input here
    });
});

http.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
