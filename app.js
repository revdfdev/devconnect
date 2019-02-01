const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const path = require("path");
require("dotenv").config({ path: ".variables.env" });

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//configure passport here
app.use(passport.initialize());
require("./config/passport")(passport);

// configure routes here

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use('/api/user', require('./routes/auth'))

module.exports = app;
