require("dotenv").config();

const mysql = require("mysql2/promise");

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

pool.getConnection().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  );
});

const models = {};

const PhoneManager = require("./PhoneManager");

models.phone = new PhoneManager();
models.phone.setDatabase(pool);

const UserManager = require("./UserManager");

models.user = new UserManager();
models.user.setDatabase(pool);

const StatusManager = require("./StatusManager");

models.status = new StatusManager();
models.status.setDatabase(pool);

const CenterManager = require("./CenterManager");

models.center = new CenterManager();
models.center.setDatabase(pool); // Fix: Use models.center.setDatabase(pool) instead of models.status.setDatabase(pool)

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    );
  },
};

module.exports = new Proxy(models, handler);
