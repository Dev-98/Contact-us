const express = require("express");
const bodyparser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
// replace the url here
const url = "";
var dbo = null;
console.log(url);
MongoClient.connect(url).then((DB) => (dbo = DB.db("test")));
console.log(dbo);
const app = express();
const path = require("path");
app.use(bodyparser.urlencoded({ extended: true }));
const PORT = 8080;

app.listen(PORT, () => {
  console.log("app listening in port " + PORT);
});

app.get("/contact-us", (req, res) => {
  res.sendFile(path.join(__dirname, "pages/contact-us.html"));
});

app.post("/contact-us", (req, res) => {
  storeInDB(req.body);
  res.redirect("/contact-us");
});

const storeInDB = (data) => {
  try {
    dbo.collection("customers").insertOne(data, function (err, res) {
      if (err) throw err;
    });
    console.error("Storing in DB success");
  } catch (err) {
    console.error("Storing in DB failed!" + err);
  }
};
