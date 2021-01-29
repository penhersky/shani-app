import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

import {getTheme} from '../../../theme';
import {useTranslation, global} from '../../../translate';

import Wrapp from '../Wrapp';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [err, setErr] = React.useState('');
  const {tr} = useTranslation();

  const onChangeEmail = (text: string) => setEmail(text);
  const onChangePass = (text: string) => setPass(text);

  const onPressHandler = () => {
    alert(email + ' ' + pass);
  };
  return (
    <Wrapp title={tr(global, 'login')}>
      <TextInput
        style={style.input}
        label="email"
        onChangeText={onChangeEmail}
        error={err === 'email'}
      />
      <TextInput
        style={style.input}
        label="password"
        onChangeText={onChangePass}
        error={err === 'pass'}
      />
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
