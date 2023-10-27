import {enablePromise, openDatabase} from 'react-native-sqlite-storage';

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
