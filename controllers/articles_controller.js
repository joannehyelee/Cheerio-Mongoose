const db = require('../models');

exports.index = function(req, res) {

    db.Article.find({})
        .then(function(dbArticle) {
            res.render('articles/saved', {
                articles: dbArticle
            })
        })
        .catch(function(err) {
            res.json(err);
        });
};

exports.saveArticle = function(req, res) {

    db.Article.findOneAndUpdate(
        {
            _id: req.params.id
        },
        {
            saved: true
        }
    )
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    });

};