import {get} from 'lodash';
import {useSelector} from 'react-redux';

export {default as collapsed} from './text/collapsed';

export const useTranslation = () => {
  const {lng} = useSelector((state: any) => state.settings);
  return {
    tr: (text: any, key: string) => get(get(text, get(lng.split('-'), 0)), key),
    lng,
  };
};
