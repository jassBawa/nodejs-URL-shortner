const express = require("express");
const urlRoute = require("./routes/url");
const connectToMongoDB = require("./connect");
const URL = require("./models/url");
const { RedirectUrl } = require("./controllers/url");

const app = express();
const PORT = 8080;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("Connected to MongoDB")
);
app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", RedirectUrl);

app.listen(PORT, () => console.log("Server is running on port 8080"));
