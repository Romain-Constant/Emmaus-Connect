const AbstractManager = require("./AbstractManager");

class StatusManager extends AbstractManager {
  constructor() {
    super({ table: "status" });
  }

  findAll() {
    return this.database.query(`select * from  ${this.table}`);
  }

  update (status) {
    return this.database.query(
      `UPDATE ${this.table} SET (id =?, update_date = ?, disponibility=?) WHERE id = ?`,
      [status.id, status.user_id, status.update_date, status.disponibility]
    );
  }
}

module.exports = StatusManager;
  
