const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("hello from express");
  res.status(200);
  res.send({ message: "hello" });
});

module.exports = app;
