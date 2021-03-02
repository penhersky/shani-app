export const SET_NOTIFICATION_COUNT = 'SET_NOTIFICATION_COUNT';

export type Notification = {
  id: number;
  title: string;
  subtitle?: string;
  time: number;
  image?: string;
  revised: boolean;
  hidden: boolean;
};
