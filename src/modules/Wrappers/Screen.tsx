import React from 'react';
import {View, Dimensions} from 'react-native';

const Wrapper = ({children}: {children: any}) => {
  return (
    <View style={{height: Dimensions.get('window').height - 130}}>
      {children}
    </View>
  );
};

export default Wrapper;
