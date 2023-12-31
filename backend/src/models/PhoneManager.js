const moment = require("moment");
const AbstractManager = require("./AbstractManager");

class PhoneManager extends AbstractManager {
  constructor() {
    super({ table: "phone" });
  }

  insert(phone) {
    const insertDate = moment(phone.addition_date).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    return this.database.query(
      `INSERT INTO ${this.table} (center_id, user_id, status_id, category_id, imei, brand, model, memory, storage, network, service_date, addition_date, phone_condition, image1, image2, image3, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        phone.center_id,
        phone.user_id,
        phone.status_id,
        phone.category_id,
        phone.imei,
        phone.brand,
        phone.model,
        phone.memory,
        phone.storage,
        phone.network,
        phone.service_date,
        insertDate,
        phone.phone_condition,
        phone.image1,
        phone.image2,
        phone.image3,
        phone.price,
      ]
    );
  }

  findAll() {
    return this.database.query(`
      SELECT
        ph.*,
        ad.city AS center_city,
        CASE WHEN st.disponibility = TRUE THEN 'À vendre' ELSE 'Non disponible' END AS status,
        CONCAT(us.firstname, ' ', us.lastname) AS user_name,
        cat.classification AS category
      FROM
        ${this.table} ph
        INNER JOIN emaus.center ce ON ph.center_id = ce.id
        INNER JOIN emaus.status st ON ph.status_id = st.id
        INNER JOIN emaus.user us ON ph.user_id = us.id
        INNER JOIN emaus.address ad ON ce.address_id = ad.id
        INNER JOIN emaus.category cat ON ph.category_id = cat.id;
    `);
  }

  find(id) {
    return this.database.query(
      `
      SELECT
        ph.*,
        ad.city AS center_city,
        CASE WHEN st.disponibility = TRUE THEN 'À vendre' ELSE 'Non disponible' END AS status,
        CONCAT(us.firstname, ' ', us.lastname) AS user_name,
        cat.classification AS category
      FROM
        ${this.table} ph
        INNER JOIN emaus.center ce ON ph.center_id = ce.id
        INNER JOIN emaus.status st ON ph.status_id = st.id
        INNER JOIN emaus.user us ON ph.user_id = us.id
        INNER JOIN emaus.address ad ON ce.address_id = ad.id
        INNER JOIN emaus.category cat ON ph.category_id = cat.id
      WHERE ph.id = ?`,
      [id]
    );
  }

  update(phone) {
    return this.database.query(
      `
      UPDATE ${this.table}
      SET imei = ?, brand = ?, model = ?, memory = ?, storage = ?, network = ?, service_date = ?, addition_date = ?, phone_condition = ?, image1 = ?, image2 = ?, image3 = ?, price = ?
      WHERE id = ?`,
      [
        phone.imei,
        phone.brand,
        phone.model,
        phone.memory,
        phone.storage,
        phone.network,
        phone.service_date,
        phone.addition_date,
        phone.phone_condition,
        phone.image1,
        phone.image2,
        phone.image3,
        phone.price,
        phone.id,
      ]
    );
  }

  delete(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}

module.exports = PhoneManager;
