
var app = require("express")();


var io = require("socket.io").listen(app.listen(3000, function () {
    console.log("*******************************SERVER READY*************************************");
}));

var fs = require("fs");

var path = require("path");

//  ==============================================================================================================

app.use(require("express").static(__dirname));  //ENABLES CLIENT CACHING OF FILES

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
// IO.SOCKETS.EMIT

var clients = 0;

io.on("connect", function (socket) {
    clients++;
    console.log("CONNECTED", clients);
    io.sockets.emit("iobroadcast", { msg: clients + " USER(S) ONLINE!" });

    socket.on("disconnect", function () {
        clients--;
        console.log("DISCONNECTED ", clients);
        io.sockets.emit("iobroadcast", { msg: clients + " USER(S) ONLINE!" });
    });

});

