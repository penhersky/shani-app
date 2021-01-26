import {get, nth} from 'lodash';
import {NativeModules} from 'react-native';

const getLng = () => {
  const ios =
    get(get(NativeModules?.SettingsManager, 'settings'), 'AppleLocale') ||
    nth(
      get(get(NativeModules?.SettingsManager, 'settings'), 'AppleLanguages'),
      0,
    );
  const android = get(NativeModules?.I18nManager, 'localeIdentifier');
  return android || ios;
};

export default {
  getLng,
};
