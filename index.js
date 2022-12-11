const express = require('express');
const app = express();
const { Server } = require('socket.io')
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html');
});

io.on('connection', (socket)=>{
    console.log('User connected');
    socket.on('message', (ms)=>{
        console.log(ms);
        io.emit('server-message', ms);
    })
});
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log('listening on *:'+PORT);
});