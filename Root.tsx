import 'react-native-gesture-handler';
import React from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {ApolloProvider} from '@apollo/client';

import {mainClient} from './src/clients';
import {
  DBProvider,
  connect as db,
  query,
  tokenSchemas,
} from './src/wrappers/db';
import store from './redux/store';
import App from './src';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Root = () => {
  React.useEffect(() => {
    query(db, tokenSchemas.table);
  }, []);

  return (
    <>
      <DBProvider database={db}>
        <ApolloProvider client={mainClient}>
          <Provider store={store}>
            <App />
          </Provider>
        </ApolloProvider>
      </DBProvider>
    </>
  );
};

export default Root;
