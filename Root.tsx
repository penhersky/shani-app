import 'react-native-gesture-handler';
import React from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {ApolloProvider} from '@apollo/client';

import {mainClient} from './src/clients';
import {DBProvider} from './src/wrappers/db';
import db from './src/wrappers/db/connect';
import {useTheme} from './src/theme';
import store from './redux/store';
import App from './src';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Root = () => {
  const theme = useTheme();
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
