const moment = require("moment");
const AbstractManager = require("./AbstractManager");

class StatusManager extends AbstractManager {
  constructor() {
    super({ table: "status" });
  }

  findAll() {
    return this.database.query(`select * from  ${this.table}`);
  }

  update(status) {
    const updateDate = moment(status.update_date).format("YYYY-MM-DD HH:mm:ss");

    return this.database.query(
      `UPDATE ${this.table} SET user_id=?, update_date=?, disponibility=? WHERE id=?`,
      [status.user_id, updateDate, status.disponibility, status.id]
    );
  }

  insert(status) {
    const insertDate = moment(status.update_date).format("YYYY-MM-DD HH:mm:ss");
    return this.database.query(
      `INSERT INTO ${this.table} (user_id, update_date)
      VALUES (?, ?)`,
      [status.user_id, insertDate]
    );
  }
}

module.exports = StatusManager;
