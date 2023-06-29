const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "category" });
  }
  Insert(category){
    return this.database.query(
      `INSERT INTO ${this.table} (classification)`, [classification]
    );
  }


  findAll(){
   return this.database.query(
    `SELECT * FROM ${this.table}`
   );

  }


  find(classification){
    return this.database.query(
      `SELECT * FROM ${this.table} where classification = ?`
    );
  }


  update(classification){
    return this.database.query(
      `UPDATE ${this.table} SET (classification = ?)`, [classification]
    );

  }


  delete(classification){
   return this.database.query(
    `DELETE from ${this.table} WHERE classification = ?`,[classification]
   );

  }
}