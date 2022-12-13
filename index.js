const express = require('express');
const app = express();
const { Server } = require('socket.io')
const http = require('http');
const server = http.createServer(app);
app.use(express.json())
const io = new Server(server);
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html');
});

app.get('/api/members', (req,res)=>{

  if(req.query.setmember != null){
  switch(req.query.setmember){
    case "tesla":
      break;
    case "curie":
      break;
    case "einstein":
      break;
    case "freud":
      break;
    case "darwin":
      break;
    case "lovelace":
      break;
    case "asimov":
      break;      
  }
  }

  res.sendFile(__dirname+"/members.json")
})

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