import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {ApolloProvider} from '@apollo/client';

import {mainClient} from './src/clients';
import {
  DBProvider,
  connect as db,
  query,
  tokenSchemas,
} from './src/wrappers/db';
import {useTheme} from './src/theme';
import store from './redux/store';
import App from './src';

const Root = () => {
  const theme = useTheme();

  React.useEffect(() => {
    query(db, tokenSchemas.table);
  }, []);

  return (
    <>
      <DBProvider database={db}>
        <ApolloProvider client={mainClient}>
          <Provider store={store}>
            <PaperProvider theme={theme}>
              <App />
            </PaperProvider>
          </Provider>
        </ApolloProvider>
      </DBProvider>
    </>
  );
};

export default Root;
