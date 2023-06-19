class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        console.log('inside');

        this.socket = io.connect('http://127.0.0.1:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }
    connectionHandler(){
        let self = this;
        this.socket.on('connect',function(){
            console.log('connection establised using socket.io');
        });

        self.socket.emit('join_room',{
            user_email:self.userEmail,
            chatroom:'codeial'
        });

        self.socket.on('user_joined',function(data){
            console.log('A user Joined!!',data);
        })
    }
}