require("dotenv").config();
const express = require("express");
const http = require("http");
// const https = require('https'); // production


const app = express();

const auth = require("./api/auth/auth.router")

app.use(express.json());

app.use("/api/reqToken", auth)

app.get("/", function (req, res) {
    res.send("Hello World!");
  });

var port = process.env.APP_PORT || 443;
// var server = https.createServer(options, app); // production
var server = http.createServer(app);

server.listen(port, function () {
  console.log("Server up and running on PORT", process.env.APP_PORT);
});
