const express = require('express');
const WebSocket = require('ws');

/* START - Mongo and API Setup */
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');

const GameInstance = require('./api/gameModel');
const User = require('./api/userModel');
const userRoutes = require('./api/userRoutes');
const gameRoutes = require('./api/gameRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

userRoutes(app);
gameRoutes(app);

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, { useNewUrlParser: true }).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
/* END - Mongo and API Setup */

app.use(express.static(__dirname + '/webapp'));

/* START - Websocket Setup */
const webSocketServer = new WebSocket.Server({ port: 8080 });

webSocketServer.on('connection', function (socket) {
  console.log("Connected");
  socket.on('message', function incoming(message) {
    var data = JSON.parse(message);
    console.log(data);
    socket.send(message);
  });
  socket.on('disconnect', function incoming(message) {
  });
  socket.on('error', function incoming(error) {
    console.log(error);
  });
});

webSocketServer.on('upgrade', function(req, socket, head) {
  console.log("Connection upgrade.");
  webSocketServer.handleUpgrade(req, socket, head, function(client){ /* etc */ });
});
/* END - Websocket Setup */

// listen for requests
app.listen(port, () => {
    console.log('Started on port: ' + port);
});
