const ENV = process.env;

export const isDevelopment: boolean = ENV.NODE_ENV === 'development';
export const isProduction: boolean = !isDevelopment;
export const mainApiUrl: string = String(ENV.MAIN_SERVER_API);
