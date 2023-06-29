const AbstractManager = require("./AbstractManager");

class CenterManager extends AbstractManager {
  constructor() {
    super({ table: "center" });
  }

  findAll() {
    return this.database.query(`SELECT * FROM ${this.table}`);
  }

  find(city) {
    return this.database.query(
      `SELECT *
      FROM
        ${this.table} 
        INNER JOIN address ON center.address_id = address.id WHERE address.city = ?`,
      [city]
    );
  }
}

module.exports = CenterManager;

