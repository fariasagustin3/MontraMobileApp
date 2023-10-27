// create user table
export const createUserTable = async (db) => {
  try {
    return db.executeSql(`
      CREATE TABLE IF NOT EXISTS user(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        pin VARCHAR(4),
        createdAt TEXT,
        updatedAt TEXT,
      );
    `);
  } catch (err) {
    console.log(err);
  }
};
