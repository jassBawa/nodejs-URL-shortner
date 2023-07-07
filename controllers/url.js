const shortid = require("shortid");
const URL = require("../models/url");

async function GenerateNewShortUrl(req, res) {
  const body = req.body;
  console.log(req.body);

  if (!body.url) return res.status(400).json({ error: "URL is required" });

  const shortId = shortid();
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });

  return res.json({ shortId });
}

async function RedirectUrl(req, res) {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId: shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );

  // a proper url should be passed only
  res.redirect(entry.redirectUrl);
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  GenerateNewShortUrl,
  RedirectUrl,
  handleGetAnalytics,
};
