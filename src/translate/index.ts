import {get} from 'lodash';
import {useSelector} from 'react-redux';

export {default as text} from './text/default';

export const useTranslation = () => {
  const {lng} = useSelector((state: any) => state.settings);
  return {
    tr: (text: any, key: string) => get(text[lng.split('-')[0]], key),
    lng,
  };
};
