const express = require("express");
const app = express();

app.listen(3007, err => {
  if (err) console.log("Server is not running");
  else console.log("Server is running ");
});
