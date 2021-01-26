// @ts-ignore
import {MAIN_SERVER_API, AUTH_SERVER_API, NODE_ENV, DB_NAME} from '@env';

export const isDevelopment: boolean = NODE_ENV === 'development';
export const isProduction: boolean = !isDevelopment;
export const mainApiUrl: string = String(MAIN_SERVER_API);
export const authApiUrl: string = String(AUTH_SERVER_API);
export const databaseName: string = String(DB_NAME);
