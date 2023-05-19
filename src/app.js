const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");

require("dotenv").config();

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use(compression());

app.get("/", cors(), (req, res) => {
  res.json({
    message: "Welcome to Musico API",
    "API Docs":
      "https://documenter.getpostman.com/view/17456794/U16jPS13#intro",
  });
});

app.use("/api/v1", cors(), api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
