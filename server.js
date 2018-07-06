// ***************************************************
// INITIAL STARTING POINT FOR THE NODE/EXPRESS SERVER
// ***************************************************

// DEPENDENCIES
// ===================================================
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");
// Mongoose is an ODM (object data modeling) library that provides schema-like structure
const cheerio = require("cheerio");
// // Cheerio parses our HTML and helps us find elements
const request = require("request");
// // Makes HTTP request for HTML page

// EXPRESS CONFIGURATION
// ===================================================
const app = express();
const PORT = process.env.PORT || 8000;

// Set handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

// Middleware to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use morgan logger for logging requests
app.use(logger("dev"));

// Require models
const db = require("./models");

// Connect to the Mongo Database
// mongoose.connect("mongodb://localhost/redditDB");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = "mongodb://heroku_smx0fx9q:dob9c46qmnfaaup49j1cfg76fd@ds127841.mlab.com:27841/heroku_smx0fx9q" || "mongodb://localhost/redditDB";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


// ROUTER
// ===================================================
require("./routes")(app);

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});

module.exports = app;