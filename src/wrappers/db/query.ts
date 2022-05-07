import SQLite from 'react-native-sqlite-storage';
import {isDevelopment} from '../../config';

const query = (
  db: SQLite.SQLiteDatabase,
  schema: string,
): Promise<{row: any[]; length: number}> => {
  return new Promise((resolve, reject) => {
    db.transaction(function (txn: SQLite.Transaction) {
      txn.executeSql(
        schema,
        [],
        function (tx: any, res: any) {
          resolve({row: res.rows.raw(), length: res.rows.length});
        },
        function (err: any) {
          reject(err);
          if (isDevelopment) {
            console.log(err);
          }
        },
      );
    });
  });
};

export default query;
