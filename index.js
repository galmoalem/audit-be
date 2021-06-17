var http = require('http')
const mongoose = require('mongoose');
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/', secret: 'yoyo' })
const express = require('express')
const app = express(); 
const router = require('./routes/push')
const  cont = require('./controllers/push-controller')
var cors = require('cors');
const localtunnel = require('localtunnel');


app.use(cors());
app.use(express.urlencoded({ extended: true }))



const tunnel = localtunnel(80, { subdomain: 'help'} ,(err, tunnel) => {
  console.log(tunnel.url)

});
http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(80)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
console.log(event.payload)
    const pushBody = {
        name : event.payload.pusher.name , 
        message : event.payload.head_commit.message , 
        url : event.payload.head_commit.url ,
        repoName : event.payload.repository.name
    }
    cont.savePush(pushBody);
})

mongoose.connect('mongodb://localhost/users',{ useNewUrlParser: true });


mongoose.connection.once('open' , function () 
{
  console.log(' connection success')
}).on('error' , function(error)
{
console.log(error)
})
app.use('/',router);



app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
  
  
});

app.enable
