const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const utils = require("util");
const server = http.createServer(app);
const socketIO = require("socket.io");
const moment = require("moment");

const io = socketIO(server);

app.use(express.static(path.join(__dirname,"src")));

const PORT = 3300;

io.on("connection", function(socket)  {
    socket.on("chatting", function(data) {
        //utils.log(data);
        const {name, msg} = data;

        io.emit("chatting", {
            name: name,
            msg: msg,
            time: moment(new Date()).format("h:mm:ss A")
        });
    });
});

server.listen(PORT, function(){
    utils.log(`Server Start! : ${PORT}`);
});

