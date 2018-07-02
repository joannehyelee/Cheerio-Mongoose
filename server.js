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
mongoose.connect("mongodb://localhost/redditDB");

// CHEERIO SCRAPER
// ===================================================
// request("https://old.reddit.com/r/gaming/", function(error, response, html) {
//     // Load the HTML into cheerio & save it to $
//     const $ = cheerio.load(html);

//     const results = [];

//     // i: iterator
//     // element: the current element
//     $("p.title").each(function(i, element) {
//         const articleTitle = $(element).text();
//         const articleLink = $(element).children().attr("href");

//         // Save the results in an object & push to results array
//         results.push({
//             title: articleTitle,
//             link: articleLink
//         });
//     });
//     console.log(results);4

// });

// ROUTER
// ===================================================
require("./routes")(app);

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});

module.exports = app;