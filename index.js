const express = require('express');
const socket = require('socket.io');
const config = require('./config');
const util = require('./util');
const app = express();

//list of all sockets connected
let connections = [];
let pattern = null;

//the API endpoint
app.get('/generate', (req, res) => {
    //check the headers
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    let filled = new Array(config.strings.length);
    //respond to the request
    res.status(200).json({
        data: util.generate(filled)
    });
});

app.use(express.static('public'));

//Run the server
const server = app.listen(config.port, () => {
    console.log(`REST API on http://komanetsky.com:${config.port}`)
});

//sockets
const io = socket(server);

//listen for connection
io.on('connection', function (socket) {
    if (connections.length == 0) {
        pattern = util.setpattern();
    }
    
    //dep old pattern info
    socket.emit('pattern', pattern);
    
    //add socket to connections list
    connections.push(socket);
    console.log('connected: %s\n%s sockets connected', socket.id, connections.length);
    
    //listen for bindhandle (user input a name)
    socket.on('bindhandle', function (data) {
        console.log(data);
        if (data.handle == '') {
            data.handle = "anonymous";
        }
        //set the name
        socket.handle = data.handle;
        // get the list of other users
        let users = [];
        connections.forEach(element => {
            users.push(element.handle);
        });
        
        //say the user joined
        io.sockets.emit('join', {
            count: connections.length,
            users
        });

        io.emit('message', {
            message: `🚀 ${socket.handle} has joined the game!`
        });
        socket.emit('bindhandle', data);
    });

    //when the user click a tile check the card
    socket.on('cardcheck', function (data) {
        if (util.checkcard(data.card)) {
            io.to(`${socket.id}`).emit('announce', {
                message: `🎉 CONGRATULATIONS 🎉`
            })
            io.emit('message', {
                message: `🎉 ${socket.handle} has bingo! 🎉`
            });
        }
    });

    //on message sent from user
    socket.on('chatmessage', function (data) {
        if (data.message === '')
            return;
        let currentdate = new Date();
        // let datetime = currentdate.getDate() + "/" +
        //     (currentdate.getMonth() + 1) + "/" +
        //     currentdate.getFullYear() + " @ " +
        //     currentdate.getHours() + ":" +
        //     currentdate.getMinutes() + ":" +
        //     currentdate.getSeconds();

        let datetime = currentdate.getHours() + ":" +
            currentdate.getMinutes() + ":" +
            currentdate.getSeconds();
        message = `${socket.handle} <small>${datetime}</small><br/>${data.message}`
        io.sockets.emit('message', {
            message
        });
    });
    
    // disconnect
    socket.on('disconnect', function (data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log('disconnected: %s\n%s sockets connected', socket.id, connections.length);
        let users = [];
        connections.forEach(element => {
            // if (element.id != socket.id)
            users.push(element.handle);
        });
        io.sockets.emit('join', {
            count: connections.length,
            users
        });
        io.emit('message', {
            message: `👋 ${socket.handle} has left!`
        });
    })

});


// socket.broadcast.emit('announce', data);
