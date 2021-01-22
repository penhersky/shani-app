import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Subheading, Searchbar} from 'react-native-paper';

import {useTranslation, text} from './translate';

const App = (): JSX.Element => {
  const {tr} = useTranslation();

  return (
    <View style={styles.app}>
      <Subheading>{tr(text, 'text')}</Subheading>
      <Searchbar placeholder="Search" value="" />
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export default App;
