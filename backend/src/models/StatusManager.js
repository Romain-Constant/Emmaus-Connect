const AbstractManager = require("./AbstractManager");
const moment = require("moment");

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
      `UPDATE ${this.table} SET id=?, update_date=?, disponibility=? WHERE id=?`,
      [status.id, updateDate, status.disponibility, status.id]
    );
  }
}

module.exports = StatusManager;
