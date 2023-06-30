const AbstractManager = require("./AbstractManager");

class CenterManager extends AbstractManager {
  constructor() {
    super({ table: "center" });
  }

  findAll() {
    return this.database.query(
      `SELECT * FROM ${this.table} JOIN address ON center.address_id = address.id`
    );
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

  insert(center) {
    return this.database.query(
      `INSERT INTO ${this.table} (address_id, phone_number, contact_email)
      SELECT id, '1234567890', 'contact@example.com' 
      FROM emaus.address
      ORDER BY id DESC
      LIMIT 1`,
      [center]
    );
  }

  update(center) {
    const {
      phoneNumber,
      contactEmail,
      city,
      department,
      district,
      postalCode,
      streetNumber,
      streetType,
      cityParams,
    } = center;

    return this.database.query(
      `UPDATE ${this.table}
      JOIN emaus.address AS a ON center.address_id = a.id
      SET center.phone_number = ?,
          center.contact_email = ?,
          a.city = ?,
          a.department = ?,
          a.district = ?,
          a.postal_code = ?,
          a.street_number = ?,
          a.street_type = ?
      WHERE a.city = ?`,
      [
        phoneNumber,
        contactEmail,
        city,
        department,
        district,
        postalCode,
        streetNumber,
        streetType,
        cityParams,
      ]
    );
  }

  delete(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}

module.exports = CenterManager;
