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
    // this.ptyProcess = null;

    socket.on("disconnect", reason => {
        console.log('reason for disconnect: ', reason);
        // this.ptyProcess.write('docker kill test_container');
    });

    socket.on("runCode", (code, callback) => {
        
        console.log('Code: ', code);
        // this.ptyProcess = pty.spawn('zsh');
        let response = '';
        this.ptyProcess = pty.spawn('zsh');
        

        // this.ptyProcess.write(code.code + '\r');

        // this.ptyProcess.write('docker create --rm -it --name test_container python:3.6-alpine');
        // this.ptyProcess.write('docker start test_container');

        this.ptyProcess.on("data", data => {
            response += data;
        });

        this.ptyProcess.write(`docker run --name test_container -it --rm replco/prybar prybar-python3 "echo ${code.code} >> index.py; python ./index.py"\r`);

        
        // this.ptyProcess.write(`docker run --name test_container -it --rm python:3.6-alpine ash -c "echo \"print('hello world')\" >> index.py; python ./index.py"\r`);

        setTimeout(() => {
            console.log('response: ', response);
            callback(response);
        }, 200);
    });

    console.log('Socket connection made');
});

server.listen(9876, () => {
  console.log('listening on port 9876');
});