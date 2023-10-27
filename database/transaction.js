// create transactions table
export const createTransactionTable = async (db) => {
  try {
    return db.executeSql(`
      CREATE TABLE IF NOT EXISTS transaction(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        amount REAL NOT NULL,
        type TEXT NOT NULL,
        FOREIGN KEY (category_id) REFERENCES category(id),
        createdAt TEXT,
        updatedAt TEXT,
      );
    `);
  } catch(err) {
    console.log(err);
  }
};
