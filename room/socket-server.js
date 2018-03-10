
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var fs = require("fs");
var path = require("path");
//  ==============================================================================================================
app.use(express.static(__dirname));  //ENABLES CLIENT CACHING OF FILES

app.get("/", function (req, res) {
    // res.setHeader('Access-Control-Allow-Origin','*');  //NEED ONLY ONE TIME FOR THE CLIENT TILL THE CLIENT CACHE IS CLEARED
    res.sendFile(__dirname + "/index.html");
    // res.status(200).send("HELLO SOCKET");
});

app.get("/socket.io.js", function (req, res) {
    fs.exists(path.join(__dirname, "socket.io.js"), function (exists) {
        if (exists) {
            res.sendFile(path.join(__dirname, "socket.io.js"));
        } else {
            res.sendStatus(404);  //SENDS STATUS CODE WITH STATUS TEXT
        }
    });
});

app.use(function (req, res) {
    res.sendStatus(404);  //SENDS STATUS CODE WITH STATUS TEXT
});
//  ==================================================SOCKET======================================================

//FUNCTIONS: io.sockets.emit / io.emit / socket.broadcast.emit / socket.emit / socket.on / io.on / io.sockets.on / socket.send
//FUNCTIONS: io.on / io.sockets.on / socket.on
//FUNCTIONS: io.of("/namespace").on

var roomno = 1;

io.on("connection", function (socket) {
    if (io.nsps['/'].adapter.rooms["room-" + roomno] && io.nsps['/'].adapter.rooms["room-" + roomno].length > 3) {
        roomno++;
    }
    // console.log(io.nsps['/'].adapter.rooms["room-" + roomno]);
    // console.log(io.nsps['/'].adapter.rooms["room-" + roomno].length);
    socket.join("room-" + roomno);
    io.sockets.in("room-" + roomno).emit("connectToRoom", "You are in room no. " + roomno);
});


//  ==============================================================================================================
http.listen(3000, function () {
    console.log("*******************************SERVER READY*************************************");
});
//  ==============================================================================================================