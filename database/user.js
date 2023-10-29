// create user table
export const createUserTable = async (db) => {
  try {
    return db.executeSql(`
      CREATE TABLE IF NOT EXISTS Users(
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        pin VARCHAR(4),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (err) {
    console.log(err);
  }
};

// return user when is created
export const getUserById = async (db, userId) => {
  try {
    let user = null;
    const users = await db.executeSql("SELECT * FROM Users WHERE user_id = ?", [userId]);
    users.forEach((result) => {
      for(let i = 0; i < result.rows.length; i++) {
        user = result.rows.item(i);
      }
    })
    
    return user;
  } catch(err) {
    console.log(err);
  }
};
