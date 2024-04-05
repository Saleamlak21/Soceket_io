// Importing necessary modules
// Importing Express.js for building web applications
const express = require('express');
// Importing CORS middleware for handling Cross-Origin Resource Sharing 
const cors = require("cors"); 
// Importing the built-in HTTP module for creating HTTP servers
const http = require('http'); 
 // Importing Socket.IO for enabling real-time, bidirectional communication between clients and servers
const { Server } = require('socket.io');


// Creating an Express application
const app = express();

// Adding CORS middleware to allow cross-origin requests
app.use(cors());

// Creating an HTTP server using Express app 
const server = http.createServer(app); 

// Creating a new instance of Socket.IO and attaching it to the HTTP server
const io = new Server(server, {
    // Configuring CORS options for Socket.IO
    cors: {
        origin: "*",// Allowing requests from http://localhost:3000
        // methods : 9"GET", "POST"}
    }
}); 

io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`)

    socket.on("join_room",(data) => {
       socket.join(data)
    })

    socket.on("send_message", (data) => {
    //   socket.broadcast.emit("receive_message", data)
    socket.to(data.room).emit("receive_message", data)
    })
})

// Starting the HTTP server to listen on port 3001
server.listen(3001, () => {
    // Logging a message indicating that the server is running
    console.log("Server is running on 3001"); 
}); 
