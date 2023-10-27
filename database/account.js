// create accounts (wallet types) table
export const createAccountTable = async (db) => {
  try {
    return db.executeSql(`
      CREATE TABLE IF NOT EXISTS account(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        balance REAL NOT NULL,
        type TEXT NOT NULL,
        createdAt TEXT,
        updatedAt TEXT,
      );
    `);
  } catch (err) {
    console.log(err);
  }
};
