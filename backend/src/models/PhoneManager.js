const AbstractManager = require("./AbstractManager");

class PhoneManager extends AbstractManager {
  constructor() {
    super({ table: "phone" });
  }

  insert(phone) {
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
        phone.addition_date,
        phone.phone_condition,
        phone.image1,
        phone.image2,
        phone.image3,
        phone.price,
      ]
    );
  }
  findAll() {
    return this.database.query(
      `SELECT * FROM ${this.table}`
    );
}

  find(id){
  return this.database.query(
    `SELECT * FROM ${this.table} WHERE id = ?`,[id]
  );
  //WARNING switch id by IMEI when IMEI it'll PK!!!
}


update(phone) {
  return this.database.query(
    `UPDATE ${this.table} SET (imei = ?, brand = ?, model = ?, memory = ?, storage = ?, network = ?, service_date = ?, addition_date = ?, phone_condition = ?, image1 = ?, image2 = ?, image3 = ?, price = ?) WHERE id = ?`, [
      
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
  //Not sure for this request, need codereview
}

delete(id){
  return this.database.query(
    `DELETE from ${this.table} WHERE id = ?`, [id]
  );
  //doing this methode for admin !!!
}

}

module.exports = PhoneManager;
