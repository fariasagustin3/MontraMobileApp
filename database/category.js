// create category table
export const createCategoryTable = async (db) => {
  try {
    return db.executeSql(`
      CREATE TABLE IF NOT EXISTS Categories(
        category_id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        icon TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch(err) {
    console.log(err);
  }
};
