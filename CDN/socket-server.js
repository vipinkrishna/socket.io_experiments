
var express = require("express");
var app = express();

var http = require("http").Server(app);

var io = require("socket.io")(http);

var fs = require("fs");

var path = require("path");


// app.use(function (req, res, next) {
//     console.log("+++++++++++++++++++++++++");
//     console.log("URL: ", req.url);
//     console.log("METHOD: ", req.method);
//     console.log("PROTOCOL: ", req.protocol);
//     console.log("HOSTNAME: ", req.hostname);
//     console.log("PATH: ", req.path);
//     console.log("QUERY: ", req.query);
//     console.log("+++++++++++++++++++++++++");
//     console.log();
//     next();
// });

// app.set('etag', false);  //DISABLE CACHING at CLIENT
// app.set('etag', true);  //ENABLE CACHING at CLIENT

app.use(express.static(__dirname));  //ENABLES CLIENT CACHING OF FILES

app.get("/", function (req, res) {
    // res.setHeader('Access-Control-Allow-Origin','*');  //NEED ONLY ONE TIME FOR THE CLIENT TILL THE CLIENT CACHE IS CLEARED
    res.sendFile(__dirname + "/index.html");
    // res.status(200).send("HELLO SOCKET");
});

// app.get("/socket.io.js", function (req, res) {
//     // res.setHeader('Access-Control-Allow-Origin','*');  //NEED ONLY ONE TIME FOR THE CLIENT TILL THE CLIENT CACHE IS CLEARED
//     var filePath = path.join(__dirname, "socket.io.js");
//     // console.log(fs.statSync(filePath).size); //FILE SIZE
//     res.setHeader("Content-Type", "application/javascript");
//     // res.setHeader("Content-Length", fs.statSync(filePath).size);
//     res.statusCode = 200;
//     fs.createReadStream(filePath).pipe(res);  //SENDS JAVASCRIPT FILE TO BROWSER
// });

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

// http.on("connection", function () {
//     console.log("<CLIENT REQUEST>");
// });

io.on("connection", function (socket) {
    console.log("A USER CONNECTED!");

    // setTimeout(function(){
    //     socket.send("MESSAGE");
    // },4000);

    setTimeout(function () {
        socket.emit("testEvent", { msg: "A CUSTOM EVENT" });
    }, 4000);

    socket.on("reniEvent", function (data) {
        console.log(data);
    });

    socket.on("disconnect", function () {
        console.log("A USER DISCONNECTED!");
    });

});

http.listen(3000, function () {
    console.log("*******************************SERVER READY*************************************");
});