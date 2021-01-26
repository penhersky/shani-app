import * as React from 'react';
import SQLite from 'react-native-sqlite-storage';

interface State {
  readonly database?: SQLite.SQLiteDatabase;
}
type DataBaseProviderProps = {
  children: React.ReactNode;
  database: SQLite.SQLiteDatabase;
};
const CountStateContext = React.createContext<State | undefined>(undefined);

function DBProvider({children, database}: DataBaseProviderProps) {
  const [state] = React.useState(database);

  return (
    <CountStateContext.Provider value={{database: state}}>
      {children}
    </CountStateContext.Provider>
  );
}

const useDataBase = (): SQLite.SQLiteDatabase => {
  const context = React.useContext(CountStateContext);
  if (!context?.database) {
    throw new Error('Database is not connected');
  }
  return context.database;
};

export {DBProvider, useDataBase};
