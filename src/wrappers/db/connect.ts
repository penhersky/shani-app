import SQLite from 'react-native-sqlite-storage';

import {databaseName} from '../../config';

export default SQLite.openDatabase(
  {
    name: databaseName,
    location: 'default',
  },
  () => {},
  () => {
    throw new Error('Database is not connected');
  },
);
