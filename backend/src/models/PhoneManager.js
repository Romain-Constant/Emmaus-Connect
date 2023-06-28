const AbstractManager = require("./AbstractManager");

class PhoneManager extends AbstractManager {
  constructor() {
    super({ table: "phone" });
  }

  async insert(phone) {
    await this.database.query(
      `INSERT INTO phone (center_id, user_id, status_id, category_id, imei, brand, model, memory, storage, network, service_date, addition_date, phone_condition, image1, image2, image3, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        phone.addition_date,
        phone.phone_condition,
        phone.image1,
        phone.image2,
        phone.image3,
        phone.price
      ]
    );
  }
  
}

module.exports = PhoneManager;
