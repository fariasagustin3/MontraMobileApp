// create budget table
export const createBudgetTable = async (db) => {
  try {
    return db.transaction((tx) => {
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS Budgets(
          budget_id INTEGER PRIMARY KEY AUTOINCREMENT,
          limits REAL NOT NULL,
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
