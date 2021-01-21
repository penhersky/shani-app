import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const App = (): JSX.Element => {
  return (
    <View style={styles.app}>
      <Text>It works well!</Text>
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
