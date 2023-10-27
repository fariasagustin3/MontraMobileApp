// create budget table
export const createBudgetTable = async (db) => {
  try {
    return db.executeSql(`
      CREATE TABLE IF NOT EXISTS budget(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        limit REAL NOT NULL,
        FOREIGN KEY (category_id) REFERENCES category(id),
        createdAt TEXT,
        updatedAt TEXT,
      );
    `);
  } catch(err) {
    console.log(err);
  }
};
