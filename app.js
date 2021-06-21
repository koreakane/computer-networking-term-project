const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());

const server = app.listen(4000, function () {
  console.log("Express server has started on port 4000");
});

const key = 1;
const value = "goodbye";

app.get("/login", function (req, res) {
  res.cookie(key, value, {});
  res.redirect("/");
});

app.get("/state", function (req, res) {
  res.send("cookie : " + req.cookies.key);
});

app.get("/", (req, res) => {
  res.send("LOL\n");
});
