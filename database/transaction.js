// create transactions table
export const createTransactionTable = async (db) => {
  try {
    return db.transaction((tx) => {
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS Transactions(
          transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT,
          amount REAL NOT NULL,
          type TEXT NOT NULL,
          category_id INTEGER REFERENCES Categories(category_id),
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `)
    });
  } catch(err) {
    console.log(err);
  }
};
