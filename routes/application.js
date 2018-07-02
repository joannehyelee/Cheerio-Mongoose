const express = require("express");
const router = express.Router();

const application_controller = require("../controllers/application_controller");

router.get('/', application_controller.index);
// localhost:8000

router.get('/scrape', application_controller.scrapeArticles);
// localhost:8000/scrape

module.exports = router;