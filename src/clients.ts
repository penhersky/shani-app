import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {find, get} from 'lodash';

import {connect, query, tokenSchemas} from './wrappers/db';

import {mainApiUrl, authApiUrl} from '../src/config';

const httpAuthLink = createHttpLink({
  uri: authApiUrl,
});

const httpMainLink = createHttpLink({
  uri: `${mainApiUrl}/graphql`,
});

const authLink = setContext(async (_, {headers}) => {
  try {
    const {row} = await query(connect, tokenSchemas.select);
    const service = find(row, {type: 'service'});
    const expiresIn = get(service, 'expiresIn');
    const date = new Date();
    return {
      headers: {
        ...headers,
        'X-user-security-token-X':
          get(find(row, {type: 'user'}), 'token') ?? '',
        'X-admin-security-token-X':
          get(find(row, {type: 'admin'}), 'token') ?? '',
        'x-service-security-token-x':
          service && expiresIn > Number(date) ? get(service, 'token') : '',
      },
    };
  } catch (error) {
    return {
      headers: {
        ...headers,
        'X-user-security-token-X': '',
        'X-admin-security-token-X': '',
        'x-service-security-token-x': '',
      },
    };
  }
});

export const mainClient = new ApolloClient({
  link: authLink.concat(httpMainLink),
  cache: new InMemoryCache(),
});

export const authClient = new ApolloClient({
  link: authLink.concat(httpAuthLink),
  cache: new InMemoryCache(),
});
