
var app = require("express")();

var http = require("http").Server(app);

var io = require("socket.io")(http);

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

app.get("/", function (req, res) {
    // res.setHeader('Access-Control-Allow-Origin','*');  //NEED ONLY ONE TIME FOR THE CLIENT TILL THE CLIENT CACHE IS CLEARED
    // res.sendFile(__dirname + "/index.html");
    res.status(200).send("HELLO SOCKET");
});

// http.on("connection", function () {
//     console.log("<CLIENT REQUEST>");
// });

io.on("connection", function (socket) {
    console.log("A USER CONNECTED!");
    
    // setTimeout(function(){
    //     socket.send("MESSAGE");
    // },4000);

    setTimeout(function(){
        socket.emit("testEvent",{msg: "A CUSTOM EVENT"});
    },4000);

    socket.on("reniEvent", function(data){
        console.log(data);
    });

    socket.on("disconnect", function(){
        console.log("A USER DISCONNECTED!");
    });

});

http.listen(3000, function () {
    console.log("*******************************SERVER READY*************************************");
});