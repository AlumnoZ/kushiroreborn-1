const express = require('express');
const app = express();
const path = require('path')
const { Server } = require('socket.io')
const fs = require('fs')
const http = require('http');
const server = http.createServer(app);

app.use(express.static(__dirname+'/public'))
app.use(express.json())
const filepath = path.resolve(__dirname + '/public/system.txt');
const io = new Server(server, {
  maxHttpBufferSize: 1e6*3
});

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html');
});

app.get('/d', (req,res)=>{
    if(fs.existsSync(filepath)){
      res.sendFile(filepath);
  } else {
      res.status(404).send('File not found');
  }
});

app.get('/sd',(req,res)=>{
  res.sendFile(__dirname + '/public/start.txt')
});

app.get('/api/members', (req,res)=>{
  let members = null;
  switch(req.query.setmember){
    case "tesla":
      members = JSON.parse(fs.readFileSync('members.json', 'utf-8'))
      members.tesla = "true"
      fs.writeFileSync('members.json',JSON.stringify(members,null,2))
      res.sendFile(__dirname+"/members.json")
      break;
    case "curie":
      members = JSON.parse(fs.readFileSync('members.json', 'utf-8'))
      members.curie = "true"
      fs.writeFileSync('members.json',JSON.stringify(members,null,2))
      res.sendFile(__dirname+"/members.json")
      break;
    case "einstein":
       members = JSON.parse(fs.readFileSync('members.json', 'utf-8'))
      members.einstein = "true"
      fs.writeFileSync('members.json',JSON.stringify(members,null,2))
      res.sendFile(__dirname+"/members.json")
      break;
    case "freud":
       members = JSON.parse(fs.readFileSync('members.json', 'utf-8'))
      members.freud = "true"
      fs.writeFileSync('members.json',JSON.stringify(members,null,2))
      res.sendFile(__dirname+"/members.json")
      break;
    case "darwin":
       members = JSON.parse(fs.readFileSync('members.json', 'utf-8'))
      members.darwin = "true"
      fs.writeFileSync('members.json',JSON.stringify(members,null,2))
      res.sendFile(__dirname+"/members.json")
      break;
    case "lovelace":
       members = JSON.parse(fs.readFileSync('members.json', 'utf-8'))
      members.lovelace = "true"
      fs.writeFileSync('members.json',JSON.stringify(members,null,2))
      res.sendFile(__dirname+"/members.json")
      break;
    case "asimov":
       members = JSON.parse(fs.readFileSync('members.json', 'utf-8'))
      members.asimov = "true"
      fs.writeFileSync('members.json',JSON.stringify(members,null,2))
      res.sendFile(__dirname+"/members.json")
      break;      
     default:
      res.sendFile(__dirname+"/members.json")
      break; 
  
  }
})
var users = []
io.on('connection', (socket)=>{
    console.log('User connected');
    socket.on('message', (ms)=>{
        console.log(ms);
        io.emit('server-message', ms);
    })

    socket.on('set-online', (usr)=>{
      users.push(usr)
      console.log('Current users: '+users)
      io.emit('server-online', users);
    })

    socket.on('set-offline', (usr)=>{
      const index = users.indexOf(usr)
      if(index > -1){
        users.splice(index, 1);
      }
      console.log('Current users: '+users)
      io.emit('server-offline', users);
    })

    socket.on('file', (filejson)=>{
      io.emit('server-file', filejson)
    })
});
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log('listening on *:'+PORT);
});
