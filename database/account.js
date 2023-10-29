// create accounts (wallet types) table
export const createAccountTable = async (db) => {
  try {
    return db.executeSql(`
      CREATE TABLE IF NOT EXISTS Accounts(
        account_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        balance REAL NOT NULL,
        type TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (err) {
    console.log(err);
  }
};

// get all accounts
export const getAccounts = async (db) => {
  try {
    const accounts = [];
    const accountsQuery = await db.executeSql("SELECT * FROM Accounts");
    accountsQuery.forEach((result) => {
      for(let i = 0; i < result.rows.length; i++) {
        accounts.push(result.rows.item(i));
      }
    });

    return accounts;
  } catch(err) {
    return err.message;
  }
}
