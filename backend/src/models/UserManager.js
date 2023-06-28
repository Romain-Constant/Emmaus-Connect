const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findByName(name) {
    return this.connection.query(
    
      [name]
    );
  }

  update(phone) {
    return this.connection.query(
      `update ${this.table} set //////////////`,
      
    );
  }

  init() {
    return this.connection.query(
      `UPDATE ${this.table} set coord_x = 1, coord_y = 1 where name="Black Pearl"`
    );
  }
}

module.exports = UserManager;