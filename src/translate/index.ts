import {get} from 'lodash';
import {useSelector} from 'react-redux';

export {default as collapsed} from './text/collapsed';
export {default as landing} from './text/landing';
export {default as auth} from './text/auth';

export {default as task} from './text/Task';
export {default as statuses} from './text/status';
export {default as global} from './text/global';
export {default as screenTitle} from './text/title';
export {default as user} from './text/user';
export {default as settings} from './text/settings';
export {default as messages} from './text/messages';

export const useTranslation = () => {
  const {lng} = useSelector((state: any) => state.settings);
  return {
    tr: (text: any, key: string) => get(get(text, get(lng.split('-'), 0)), key),
    lng,
  };
};
