// create category table
export const createCategoryTable = async (db) => {
  try {
    return db.executeSql(`
      CREATE TABLE IF NOT EXISTS category(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        icon TEXT,
        createdAt TEXT,
        updatedAt TEXT,
      );
    `);
  } catch(err) {
    console.log(err);
  }
};
