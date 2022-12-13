const express = require('express');
const app = express();
const { Server } = require('socket.io')
const fs = require('fs')
const http = require('http');
const server = http.createServer(app);
const members = require('./members.json')
app.use(express.json())
const io = new Server(server);
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html');
});

app.get('/api/members', (req,res)=>{

  if(req.query.setmember != null){
  switch(req.query.setmember){
    case "tesla":
      fs.readFile('./members.json')
      .then(body=> JSON.parse(body))
      .then(json=>{
        json.tesla = "true"
      })
      .then(json => JSON.stringify(json))
      .then(body => fs.writeFile(fn, body))
      .catch(error => console.warn(error))
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