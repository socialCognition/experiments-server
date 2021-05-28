  
const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const fs = require('fs');

// create express app
const app = express();
const port = process.env.PORT || 3000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(cors())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    fs.appendFileSync("/home/lab/server-logs.txt", "recieved request at " + new Date(), () => {})
    res.json({"message": "Welcome to the social cognition lab's experiment results server"});
});

// Require Notes routes
require('./routes/result.routes')(app);

// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port 3000");
});