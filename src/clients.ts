import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

import {mainApiUrl, authApiUrl} from '../src/config';

const httpAuthLink = createHttpLink({
  uri: authApiUrl, // 'https://977196d0f7b8.ngrok.io/graphql',
});

const httpMainLink = createHttpLink({
  uri: mainApiUrl,
});

const authLink = setContext((_, {headers}) => {
  return {
    headers: {
      ...headers,
      'X-user-security-token-X': '',
      'X-admin-security-token-X': '',
      'x-service-security-token-x': '',
    },
  };
});

export const mainClient = new ApolloClient({
  link: authLink.concat(httpMainLink),
  cache: new InMemoryCache(),
});

export const authClient = new ApolloClient({
  link: authLink.concat(httpAuthLink),
  cache: new InMemoryCache(),
});
