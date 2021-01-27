import SQLite from 'react-native-sqlite-storage';
import {isDevelopment} from '../../config';

const insertQuery = (
  db: SQLite.SQLiteDatabase,
  del: string,
  insert: string,
  cb?: (err?: any, data?: {row: any[]; length: number}) => void,
) => {
  const errRes = function (err: any) {
    cb && cb(err);
    if (isDevelopment) {
      console.log(err);
    }
  };
  db.transaction(function (txn: SQLite.Transaction) {
    txn.executeSql(
      del,
      [],
      () => {
        txn.executeSql(
          insert,
          [],
          (tx: any, data: any) => {
            cb &&
              cb(undefined, {row: data.rows.raw(), length: data.rows.length});
          },
          errRes,
        );
      },
      errRes,
    );
  });
};

export default insertQuery;
