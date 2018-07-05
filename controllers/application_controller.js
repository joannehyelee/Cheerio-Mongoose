const cheerio = require("cheerio");
// Cheerio parses our HTML and helps us find elements
const request = require("request");
// Makes HTTP request for HTML page

const db = require('../models');

exports.index = function(req, res) {

    db.Article.find({})
        .then(function(dbArticle) {
            res.render('index', {
                articles: dbArticle
            })
        })
        .catch(function(err) {
            res.json(err);
        });
};

exports.scrapeArticles = function(req, res) {

    request("https://www.reddit.com/r/gaming/", function(error, response, html) {
        // Load the HTML into cheerio & save it to $
        const $ = cheerio.load(html);
    
        // i: iterator
        // element: the current element
        $("h2").each(function(i, element) {

            const results = {};

            results.title = $(this).text();
            results.link = "https://www.reddit.com" + $(this).parent().attr("href");

            // Create a new Article using the results object built from scraping
            db.Article.create(results)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function(err){
                    console.log(err.message);
                    return res.json(err);
                });
        });
    });

    res.render('index');
};