export const SET_CATEGORIES = 'SET_CATEGORIES';

export type Category = {
  id: string;
  name: string;
  icon?: string;
  image?: string;
  description?: string;
  parent?: string;
};
