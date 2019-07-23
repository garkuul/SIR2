var Uploader = require('express-uploader');
const port = 3000;
const mysql = require("mysql");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
var cors = require("cors");
const path = require("path");
var crypto = require("crypto-js");


var publicDir = require("path").join(__dirname, "/public");
app.use(express.static(publicDir));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "clickphoto"
});

con.connect(err => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

global.con = con;
global.http = http;

app.use(express.json());
app.use(cors());

app.post('/notmultiple', function(req, res, next) {
  var uploader = new Uploader({
      debug: true,
      validate: true,
      thumbnails: true,
      thumbToSubDir: true,
      tmpDir: __dirname + '/tmp',
      publicDir: __dirname + '/public',
      uploadDir: __dirname + '/public/uploads/posts',
      uploadUrl: '/files/',
      thumbSizes: [140, [100, 100]]
  });
  uploader.uploadFile(req, function(data) {
      res.send(JSON.stringify(data), {'Content-Type': 'text/plain'}, 200);
  });
});

app.use(express.static("public"));

app.use(
  "/public/uploads/posts",
  express.static(__dirname + "/public/uploads/posts")
);
app.use(
  "/public/uploads/profile",
  express.static(__dirname + "/public/uploads/profile")
);

var userRoutes = require("./routes/user");
var postsRoutes = require("./routes/posts");

app.use("/user", userRoutes);
app.use("/posts", postsRoutes);

http.listen(3001, function() {
  console.log("listening on *:3001");
});
