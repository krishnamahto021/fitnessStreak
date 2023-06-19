module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer,{cors:{origin:'*'}});
    io.sockets.on('connection',function(socket){
        console.log('new connection recieved!!',socket.id);

        socket.on('disconnect',function(){
            console.log('socket is disconnected!');
        })

        socket.on('join_room',function(data){
            console.log('Joining Request recieved!',data);
            socket.join(data.chatroom);

            io.to(data.chatroom).emit('user_joined',data);
        })
    })
}