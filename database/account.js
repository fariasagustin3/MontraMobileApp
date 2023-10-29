// create accounts (wallet types) table
export const createAccountTable = async (db) => {
  try {
    return db.executeSql(`
      CREATE TABLE IF NOT EXISTS Accounts(
        account_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        balance REAL DEFAULT 0.00,
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
};

export const getAccountById = async (db, accountId) => {
  try {
    const accountCreated = null;
    const selectQuery = await db.executeSql("SELECT * FROM Accounts WHERE account_id = ?", [accountId]);
    selectQuery.forEach((result) => {
      for(let i = 0; i < result.rows.length; i++) {
        accountCreated = result.rows.item(i);
      };
    });

    return accountCreated;
  } catch(err) {
    return err.message;
  }
}

// create accounts
export const createNewAccount = async (db, name, balance, type) => {
  try {
    const insertQuery = await db.executeSql("INSERT INTO Accounts (name, balance, type) VALUES (?, ?, ?)", [name, balance, type]);
    return insertQuery[0].insertId;
  } catch(err) {
    return err.message;
  }
}
