const express = require("express");
const router = express.Router();

const articles_controller = require("../controllers/articles_controller");

router.get('/saved', articles_controller.index);
// localhost:8000/articles/saved

router.put('/', articles_controller.saveArticle);
// localhost:8000/articles/:id

module.exports = router;