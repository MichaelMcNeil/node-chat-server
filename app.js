var app = require('http').createServer()
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , ioc = require('socket.io-client');

app.listen(3030);

var user = {
    friends: [
    {
        name: "Tyler",
        online: false
    },
    {
        name: 'Rachel',
        online: false
    }],
    socket_id: null,
    name: 'michael'
}


io.configure(function (){
    io.set('authorization', function (handshakeData, callback) {
        
        //Check to see if client is authorized
        //Callback is (error, isAuthenticated)
        if(handshakeData.query.u == user.name){
            console.info('***'+user.name + ' is authorized***');
            handshakeData.user = user;
            callback(null, true);
        }
        else
            callback(null, false);
    });
});

io.sockets.on('connection', function (socket) {
    console.info(socket.handshake);
});


var socket = ioc.connect('http://localhost:3030?u=michael');

socket.on('connect', function(){
    console.info('***successfully connected***');
});

socket.on('error', function(reason){
    console.error('unable to connect to socketio', reason);
});

