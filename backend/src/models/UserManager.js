const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "User" });
  }

  insertUserWithAddress(
    centerId,
    city,
    department,
    district,
    postalCode,
    streetNumber,
    streetType,
    email,
    password,
    firstname,
    lastname,
    phoneNumber,
    role
  ) {
    const insertAddressQuery = `
      INSERT INTO \`emaus\`.\`address\` (\`city\`, \`department\`, \`district\`, \`postal_code\`, \`street_number\`, \`street_type\`)
      VALUES (?, ?, ?, ?, ?, ?);
    `;

    const insertUserQuery = `
      INSERT INTO \`emaus\`.\`user\` (\`center_id\`, \`address_id\`, \`email\`, \`password\`, \`firstname\`, \`lastname\`, \`phone_number\`, \`role\`)
      VALUES (?, LAST_INSERT_ID(), ?, ?, ?, ?, ?, ?);
    `;

    return this.database.transaction(async (connection) => {
      await connection.query(insertAddressQuery, [
        city,
        department,
        district,
        postalCode,
        streetNumber,
        streetType,
      ]);
      const insertedAddressId = connection.getLastInsertId();

      await connection.query(insertUserQuery, [
        centerId,
        insertedAddressId,
        email,
        password,
        firstname,
        lastname,
        phoneNumber,
        role,
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
        u.firstname,
        u.lastname,
        u.phone_number,
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
