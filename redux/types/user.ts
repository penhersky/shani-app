export const SET_SHORT_USER = 'SET_SHORT_USER';
export const SET_USER = 'SET_USER';
export const SET_USER_TYPE = 'SET_USER_TYPE';
export const SET_ADMIN = 'SET_ADMIN';

export type User = {
  id: string;
  name: string;
  email?: string;
  provider?: string;
  type?: string;
  active?: boolean;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  description?: string;
  birthday?: string;
  categoriesId?: [string];
  image: string;
};

export type Admin = {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
  state: string;
};
