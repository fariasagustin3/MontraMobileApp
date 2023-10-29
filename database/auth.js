import { getUserById } from "./user";

// login users
export const login = async (db, email, password) => {
  try {

  } catch (err) {
    return err.message;
  }
};

// register users
export const register = async (db, name, email, password) => {
  try {
    const query = await db.executeSql("INSERT INTO Users(name, email, password) VALUES (?, ?, ?)", [name, email, password]);
    return query[0].insertId;
  } catch (err) {
    return err.message;
  }
};

// register a new pin
export const registerPin = async (db, pin, userId) => {
  try {
    const query = await db.executeSql("UPDATE Users SET pin = ? WHERE user_id = ?", [pin, userId]);
    return query;
  } catch(err) {
    return err.message;
  }
};

export const loginUserPin = async (db, pin, userId) => {
  try {
    const error = {
      status: 401,
      message: "Invalid credentials"
    }
    const user = await getUserById(db, userId)
    if(user.pin === pin) {
      return user;
    } else {
      return error;
    }
  } catch(err) {
    return err.message;
  }
};
