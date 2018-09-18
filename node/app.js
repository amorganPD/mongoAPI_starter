const express = require('express');
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

// listen for requests
app.listen(port, () => {
    console.log('Started on port: ' + port);
});
