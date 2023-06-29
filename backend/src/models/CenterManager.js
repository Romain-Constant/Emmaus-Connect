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

  update(center) {
    const {
      id,
      phone_number,
      contact_email,
      address_id,
      address_city,
      address_department,
      address_district,
      address_postal_code,
      address_street_number,
      address_street_type
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
      WHERE center.address_id = ?`,
      [
        phone_number,
        contact_email,
        address_city,
        address_department,
        address_district,
        address_postal_code,
        address_street_number,
        address_street_type,
        address_id
      ]
    );
  }

  delete(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}

module.exports = CenterManager;
