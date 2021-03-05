import 'react-native-gesture-handler';
import React from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {ApolloProvider} from '@apollo/client';
import {Provider as PaperProvider} from 'react-native-paper';

import {mainClient} from './src/clients';
import {
  DBProvider,
  connect as db,
  query,
  tokenSchemas,
  notificationSchemas,
  settings,
} from './src/wrappers/db';

import store from './redux/store';
import {useTheme} from './src/theme';
import App from './src';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const InitialTheme = () => {
  const theme = useTheme();
  return (
    <PaperProvider theme={theme as any}>
      <App />
    </PaperProvider>
  );
};

const Root = () => {
  React.useEffect(() => {
    query(db, tokenSchemas.table);
    query(db, notificationSchemas.table);
    query(db, settings.table);
  }, []);

  return (
    <>
      <DBProvider database={db}>
        <ApolloProvider client={mainClient}>
          <Provider store={store}>
            <InitialTheme />
          </Provider>
        </ApolloProvider>
      </DBProvider>
    </>
  );
};

export default Root;
