import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Subheading} from 'react-native-paper';

const App = (): JSX.Element => {
  return (
    <View style={styles.app}>
      <Subheading>It works well!</Subheading>
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
