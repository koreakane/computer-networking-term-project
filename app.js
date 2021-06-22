const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(cookieParser());

app.use(
  session({
    secret: "SECRET",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 2,
    },
  })
);

const server = app.listen(4000, function () {
  console.log("Express server has started on port 4000");
});

app.get("/login", function (req, res) {
  res.redirect("/");
});

app.get("/state", function (req, res) {
  res.send("cookie : " + req.cookies.key);
});

let exampleInfo = {
  id: "101",
  name: "손창범",
  authorized: true,
  number: 1,
};

app.get("/", function (req, res) {
  console.log(req.session);

  if (!req.session.info) {
    req.session.info = exampleInfo;
  } else {
    req.session.info = {
      ...exampleInfo,
      number: req.session.info.number + 1,
    };
  }

  res.cookie("user", req.session.info, {
    maxAge: 9000000,
    sameSite: true,
  });
  res.send(req.session.info);

  // console.log(req.cookies);
});
