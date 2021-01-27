import React from 'react';
import {View} from 'react-native';
import {Title, Button} from 'react-native-paper';

const Login = ({navigation}: any) => {
  return (
    <View>
      <Title>Login</Title>
      <Button onPress={() => navigation.navigate('Landing')}>Landing</Button>
    </View>
  );
};

export default Login;
