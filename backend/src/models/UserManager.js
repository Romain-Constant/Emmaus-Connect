const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "User" });
  }

  insert(user) {
    const addressQuery = `
      INSERT INTO address (city, department, district, postal_code, street_number, street_type)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    return this.database
      .query(addressQuery, [
        user.city,
        user.department,
        user.district,
        user.postal_code,
        user.street_number,
        user.street_type,
      ])
      .then(() => {
        const getLastInsertId = `SELECT LAST_INSERT_ID() AS address_id`;
        return this.database.query(getLastInsertId);
      })
      .then(([addressResult]) => {
        const addressId = addressResult[0].address_id;

        const userQuery = `
        INSERT INTO user (center_id, address_id, email, password, firstname, lastname, phone_number, role)
        VALUES (
          (SELECT id FROM center ORDER BY RAND() LIMIT 1),
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?
        )
      `;
        return this.database.query(userQuery, [
          addressId,
          user.email,
          user.password,
          user.firstname,
          user.lastname,
          user.phone_number,
          user.role,
        ]);
      });
  }

  findAllUsers() {
    const query = `
      SELECT
        u.id AS user_id,
        u.email,
        u.firstname,
        u.lastname,
        u.phone_number,
        u.role,
        c.id AS center_id,
        c.phone_number AS center_phone,
        c.contact_email,
        a.id AS address_id,
        a.city,
        a.department,
        a.district,
        a.postal_code,
        a.street_number,
        a.street_type
      FROM
        \`emaus\`.\`user\` AS u
        JOIN \`emaus\`.\`center\` AS c ON u.center_id = c.id
        JOIN \`emaus\`.\`address\` AS a ON u.address_id = a.id;
    `;

    return this.database.query(query).then(([rows]) => rows);
  }

  findByEmail(email) {
    const query = `
      SELECT
        u.id AS user_id,
        u.email,
        u.password,
        u.role,
        c.id AS center_id,
        c.phone_number AS center_phone,
        a.id AS address_id
      FROM
        \`emaus\`.\`user\` AS u
        JOIN \`emaus\`.\`center\` AS c ON u.center_id = c.id
        JOIN \`emaus\`.\`address\` AS a ON u.address_id = a.id
      WHERE
        u.email = ?;
    `;

    return this.database.query(query, [email]).then(([rows]) => rows);
  }
}

module.exports = UserManager;
