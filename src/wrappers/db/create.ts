import SQLite from 'react-native-sqlite-storage';
import {isDevelopment} from '../../config';

const create = (
  db: SQLite.SQLiteDatabase,
  schema: string,
  cb?: (err?: any, data?: {row: any[]; length: number}) => void,
) => {
  db.transaction(function (txn: SQLite.Transaction) {
    txn.executeSql(
      schema,
      [],
      function (tx: any, res: any) {
        cb && cb(undefined, {row: res.rows.raw(), length: res.rows.length});
      },
      function (err: any) {
        cb && cb(err);
        if (isDevelopment) {
          console.log(err);
        }
      },
    );
  });
};

export default create;
