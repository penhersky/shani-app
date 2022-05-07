import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View} from 'react-native';
import {List, Switch} from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';

import {Picker} from '../../components';

import {useTranslation, settings as text} from '../../translate';
import {useTheme} from '../../theme';
import {SET_LNG, Lng, SET_THEME} from '../../../redux/types/settings';

import style from './style';

const languages = [
  {
    value: Lng.en,
    label: 'English',
  },
  {
    value: Lng.ua,
    label: 'Українська',
  },
  {
    value: Lng.ru,
    label: 'Русский',
  },
];

const Settings = () => {
  const {lng, theme} = useSelector((state: any) => state.settings);
  const dispatch = useDispatch();
  const mode = useTheme();
  const {tr} = useTranslation();

  const onChangeLng = (value: string) => {
    dispatch({
      type: SET_LNG,
      lng: value,
    });
  };

  const onChangeTheme = () =>
    dispatch({
      type: SET_THEME,
      theme: theme === 'dark' ? 'white' : 'dark',
    });

  return (
    <View>
      <List.Section>
        <List.Subheader>{tr(text, 'general')}</List.Subheader>
        <List.Item
          title={tr(text, 'theme')}
          description={tr(text, 'themeDescription')}
          left={() => (
            <Switch
              style={style.switch}
              value={theme === 'dark'}
              onValueChange={onChangeTheme}
            />
          )}
        />
        <Picker
          icon={
            <Icon
              name="language"
              style={{margin: 10, marginHorizontal: 20}}
              size={25}
              color={mode.colors.text}
            />
          }
          list={languages}
          value={lng}
          onChange={onChangeLng}
        />
      </List.Section>
    </View>
  );
};

export default Settings;
