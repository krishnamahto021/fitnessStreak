module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer,{cors:{origin:'*'}});
    io.sockets.on('connection',function(socket){
        console.log('new connection recieved!!',socket.id);

        socket.on('disconnect',function(){
            console.log('socket is disconnected!');
        })
    })
}