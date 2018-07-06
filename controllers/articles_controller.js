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

// router.put('save/:id', articles_controller.saveArticle);
// localhost:8000/articles/save/:id
exports.saveArticle = function(req, res) {

    db.Article.update(
        {
            _id: req.params.id
        },
        {
            $set: {
                saved: true
            }
        },
        {
            new: true
        }
    )
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    });
};

// router.put('/remove/:id', articles_controller.removeArticle);
// localhost:8000/articles/remove/:id
exports.removeArticle = function(req, res) {

    db.Article.update(
        {
            _id: req.params.id
        },
        {
            $set: {
                saved: false
            }
        },
        {
            new: true
        }
    )
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    });
};

exports.getNote = function(req, res) {
// Get Article by id & populate it with it's note

    db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });

};

exports.saveNote = function(req, res) {
// Save & update Article's note

    db.Note.create(req.body)
        .then(function(dbNote) {
            // Find Article with '_id' = 'req.params.id'
            // Update the Article to be associated with the new Note
            // { new: true } returns the updated Article
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id}, { new: true });
        })
        .then(function(dbArticle) {
            // Send updated Article back to the client
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
};