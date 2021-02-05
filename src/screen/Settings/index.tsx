import React from 'react';
import {View} from 'react-native';
import {List} from 'react-native-paper';

import {useTranslation, settings as text} from '../../translate';

import style from './style';

const Settings = () => {
  const {tr} = useTranslation();
  return (
    <View>
      <List.Section>
        <List.Subheader>{tr(text, 'general')}</List.Subheader>
        <List.Item
          title="First Item"
          left={() => <List.Icon icon="folder" />}
        />
        <List.Item
          title="Second Item"
          left={() => <List.Icon color="#000" icon="folder" />}
        />
      </List.Section>
    </View>
  );
};

export default Settings;
