const fs = require("node:fs");
const path = require("node:path");
require("dotenv").config();
const mysql = require("mysql2/promise");
// const bodyParser = require("body-parser");

const database = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

database
  .getConnection()
  .then(() => {
    console.info("Serveur okkkk mamen");
  })
  .catch((err) => {
    console.error(err);
  });

const express = require("express");

const app = express();

app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: false }));

const cors = require("cors");

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

const router = require("./router");

app.use(router);

app.use(express.static(path.join(__dirname, "../public")));

const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));
  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

module.exports = app;
