const express = require('express');
const pty = require("node-pty");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.sockets.on('disconnect', ()=> {
    console.log('user disconnected');
});

io.on("connection", socket => {
    this.ptyProcess = null;
    socket.on("disconnect", reason => {
        console.log('reason for disconnect: ', reason);
    });

    socket.on("hello", () => {
        console.log('SocketStruck says hello!');
    });

    socket.on("runCode", code => {
        let response = '';
        console.log('Code: ', code);
        this.ptyProcess = pty.spawn('python3');
        console.log('PTY: ', this.ptyProcess);
        this.ptyProcess.on("data", data => {
            response += data;
        });

        this.ptyProcess.write(code.code + '\r');

        setTimeout(() => {
            console.log('response: ', response);
        }, 200);
        // this.ptyProcess.write(code.code);
        // this.ptyProcess.write('\r');
    });

    console.log('Socket connection made');
});

io.on("hello", socket => {
    console.log('SocketStruck says hello!');
});

server.listen(9876, () => {
  console.log('listening on port 9876');
});