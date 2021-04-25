var Express = require('express');
var App = Express();
var path = require('path');
var PORT = process.env.PORT || 443;
var HTTP = require('http').createServer(App).listen(PORT);
var soket = require('socket.io')(HTTP);
var cors = require('cors');

App.use(cors({ origin: true }));

App.set('views', path.join(__dirname, 'Views'))
App.get('/',(req,res)=>{
res.sendFile(path.join(__dirname,"/Views","/index.html"))
});



/*
__________________
#  All EVENTS
___________________
*  RECEVED_FROM_WEB
*  SEND_CLINT
*  RECEVD_FROM_CLINT
*  SEND_WEB
____________________

*/


// Recevd all connection  and manage to (send / recevd) data

soket.on('connection',(socketid)=>{


//TODO: It's take web response and send clint

socketid.on('RECEVED_FROM_WEB',(data)=>{

    socketid.broadcast.emit('SEND_CLINT',data)
})


//TODO: It's take clint masage and send to my web


socketid.on("RECEVD_FROM_CLINT",(data)=>{

    socketid.broadcast.emit('SEND_WEB',data);
})


//When Clint disconect

socketid.on('disconnect',()=>{

})


})


