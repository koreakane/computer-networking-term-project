const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

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

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

const server = app.listen(4000, function () {
  console.log("Express server has started on port 4000");
});

app.get("/login", function (req, res) {
  res.redirect("/");
});

app.get("/state", function (req, res) {
  res.send("cookie : " + req.cookies.key);
});

let exampleInfo_cookie = {
  id: 99,
  name: "쿠키",
  authorized: true,
  counter: 1,
};

let exampleInfo_jwt = {
  id: 100,
  name: "jwt",
  authorized: true,
  counter: 1,
};

app.get("/", function (req, res) {
  console.log(req.session);

  res.send(req.session.info_cookie);
});

app.get("/get-cookie", function (req, res) {
  console.log(req.session);

  if (!req.session.info_cookie) {
    req.session.info_cookie = exampleInfo_cookie;
  }

  res.cookie("user", req.session.info_cookie, {
    maxAge: 9000000,
    sameSite: true,
  });
  res.send(req.session.info_cookie);

  // console.log(req.cookies);
});

app.post("/post-cookie", function (req, res) {
  console.log(req.body);

  req.session.info_cookie = req.body.info_cookie;

  res.send(req.session.info_cookie);
});

const generateAccessToken = (data) => {
  return jwt.sign(data, "SECRET", {
    expiresIn: "15m",
  });
};

app.get("/get-jwt", function (req, res) {
  console.log(req.session);

  if (!req.session.info_jwt) {
    req.session.info_jwt = exampleInfo_jwt;
  }

  res.json({
    info_jwt: req.session.info_jwt,
    accessToken: generateAccessToken(req.session.info_jwt),
  });
});

app.post("/post-jwt", function (req, res) {
  console.log(req.body);

  // const clientToken = req.body.token;

  // jwt.verify(clientToken, "SECRET")

  req.session.info_jwt = req.body.info_jwt;

  res.json({
    info_jwt: req.session.info_jwt,
    accessToken: generateAccessToken(req.session.info_jwt),
  });
});
