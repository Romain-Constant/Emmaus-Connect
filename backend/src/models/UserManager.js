const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findByName(name) {
    return this.connection.query([name]);
  }
}

module.exports = UserManager;
