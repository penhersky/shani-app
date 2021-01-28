import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

import {getTheme} from '../../../theme';
import {useTranslation, global} from '../../../translate';

import Wrapp from '../Wrapp';

const Login = () => {
  const {tr} = useTranslation();

  const onPressHandler = () => {
    alert(1);
  };
  return (
    <Wrapp title={tr(global, 'login')}>
      <TextInput style={style.input} label="email" />
      <TextInput style={style.input} label="password" />
      <Button mode="outlined" style={style.button} onPress={onPressHandler}>
        {tr(global, 'login')}
      </Button>
    </Wrapp>
  );
};

const style = StyleSheet.create({
  input: {
    backgroundColor: getTheme.colors.accent,
    margin: 10,
  },
  button: {
    backgroundColor: getTheme.colors.accent,
    margin: 10,
  },
});

export default Login;
