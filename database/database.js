import {deleteDatabase, enablePromise, openDatabase} from 'react-native-sqlite-storage';
import { createUserTable } from './user';
import { createTransactionTable } from './transaction';
import { createCategoryTable } from './category';
import { createBudgetTable } from './budget';
import { createAccountTable } from './account';

enablePromise(true);

// create database and return db object
export const getDbConnection = async () => {
  try {
    const db = await openDatabase(
      {name: 'montradb.db', location: 'default'},
      () => console.log('Database connected successfully'),
      (err) => console.log('DB connection error at: ' + err),
    );
    return db;
  } catch (err) {
    console.log(err);
  }
};

// delete database
export const deleteDb = async () => {
  try {
    await deleteDatabase("montradb.db");
    console.log("database deleted successfully")
  } catch(err) {
    console.log(err);
  }
};

// init database and create all tables
export const initDatabase = async (db) => {
  try {
    await createUserTable(db);
    await createCategoryTable(db);
    await createTransactionTable(db);
    await createBudgetTable(db);
    await createAccountTable(db);
  } catch(err) {
    console.log(err);
  }
}
