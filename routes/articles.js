const express = require("express");
const router = express.Router();

const articles_controller = require("../controllers/articles_controller");

router.get('/saved', articles_controller.index);
// localhost:8000/articles/saved

router.put('/:id', articles_controller.saveArticle);
// localhost:8000/articles/save/:id

router.get('/:id', articles_controller.getNote);
// localhost:8000/articles/:id

router.post('/:id', articles_controller.saveNote);
// localhost:8000/articles/:id

module.exports = router;