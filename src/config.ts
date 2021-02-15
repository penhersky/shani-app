// @ts-ignore
import {MAIN_SERVER_API, AUTH_SERVER_API, NODE_ENV, DB_NAME} from '@env';

export const isDevelopment: boolean = NODE_ENV === 'development';
export const isProduction: boolean = !isDevelopment;
export const mainApiUrl: string = 'https://2bb163065a8c.ngrok.io'; //String(MAIN_SERVER_API);
export const authApiUrl: string = 'https://e7dabec535c9.ngrok.io/graphql'; // String(AUTH_SERVER_API);
export const databaseName: string = String(DB_NAME);
