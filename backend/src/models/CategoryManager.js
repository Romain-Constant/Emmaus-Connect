const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "category" });
  }

  Insert(classification) {
    return this.database.query(`INSERT INTO ${this.table} (classification)`, [
      classification,
    ]);
  }

  findAll() {
    return this.database.query(`SELECT * FROM ${this.table}`);
  }

  find(classification) {
    return this.database.query(
      `SELECT * FROM phone JOIN category ON phone.category_id=category.id where classification = ?`,
      [classification]
    );
  }
}
module.exports = CategoryManager;
