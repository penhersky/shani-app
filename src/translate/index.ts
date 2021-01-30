import {get} from 'lodash';
import {useSelector} from 'react-redux';

export {default as collapsed} from './text/collapsed';
export {default as landing} from './text/landing';
export {default as auth} from './text/auth';

export {default as global} from './text/global';

export const useTranslation = () => {
  const {lng} = useSelector((state: any) => state.settings);
  return {
    tr: (text: any, key: string) => get(get(text, get(lng.split('-'), 0)), key),
    lng,
  };
};
