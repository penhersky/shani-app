import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';

import {getTheme} from '../../../theme';
import {useTranslation, global, auth} from '../../../translate';

import validation from '../../../lib/validation';

import {PassInput} from '../../../components';
import Wrapp from '../Wrapp';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [err, setErr] = React.useState(false);
  const {tr} = useTranslation();

  const onChangeEmail = (text: string) => setEmail(text);
  const onChangePass = (text: string) => setPass(text);

  const onPressHandler = () => {
    const validEmail = validation.email(email);
    if (validEmail) {
      return setErr(true);
    }
    if (pass.length < 6) {
      return setErr(true);
    }
    setErr(false);
    alert('ok');
  };
  return (
    <Wrapp title={tr(global, 'login')}>
      <Text style={style.errText}>{err ? tr(auth, 'error') : ''}</Text>
      <TextInput
        style={style.input}
        label="email"
        onChangeText={onChangeEmail}
        error={err}
        mode="outlined"
        value={email}
        left={<TextInput.Icon name="email" />}
      />

      <PassInput
        style={style.input}
        onChangePass={onChangePass}
        err={err}
        value={pass}
      />
      <Button mode="outlined" style={style.button} onPress={onPressHandler}>
        {tr(global, 'login')}
      </Button>
    </Wrapp>
  );
};

const style = StyleSheet.create({
  errText: {
    color: getTheme.colors.error,
    textAlign: 'center',
  },
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
