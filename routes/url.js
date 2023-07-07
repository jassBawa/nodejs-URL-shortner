const express = require("express");
const {
  GenerateNewShortUrl,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", GenerateNewShortUrl);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
