import React from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {useLazyQuery} from '@apollo/client';

import {getTheme} from '../../../theme';
import {useTranslation, global, auth} from '../../../translate';
import {authClient} from '../../../clients';

import validation from '../../../lib/validation';
import {login} from '../../../schemas/auth';

import {useDataBase, insert, tokenSchemas} from '../../../wrappers/db';

import {PassInput} from '../../../components';
import Wrapp from '../Wrapp';

const Login = ({route}: any) => {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [err, setErr] = React.useState(false);
  const {tr} = useTranslation();
  const db = useDataBase();
  const dispatch = useDispatch();
  const [loadGreeting, {loading, data, error}] = useLazyQuery(login, {
    client: authClient,
  });

  const onChangeEmail = (text: string) => setEmail(text);
  const onChangePass = (text: string) => setPass(text);
  const onPressHandler = () => {
    const validEmail = validation.email(email);
    if (validEmail) {
      return setErr(true);
    }
    if (pass.length < 6) {
      route.params.loginSuccess();
      return setErr(true);
    }
    setErr(false);
    loadGreeting({variables: {email, password: pass}});
  };

  React.useEffect(() => {
    if (data) {
      if (data.login?.result === 'SUCCESS') {
        insert(
          db,
          tokenSchemas.deleteByType('user'),
          tokenSchemas.insert(data.login.token, 'user'),
        );
        return;
      }
      setErr(true);
    }
  }, [data, db, dispatch]);

  return (
    <Wrapp title={tr(global, 'login')}>
      <Text style={style.errText}>
        {err || Boolean(error) ? tr(auth, 'error') : ''}
      </Text>
      <TextInput
        style={style.input}
        label={tr(auth, 'email')}
        onChangeText={onChangeEmail}
        error={err || Boolean(error)}
        mode="outlined"
        value={email}
        left={<TextInput.Icon name="email" />}
      />

      <PassInput
        style={style.input}
        onChangePass={onChangePass}
        err={err || Boolean(error)}
        value={pass}
      />
      <Button
        mode="outlined"
        style={style.button}
        onPress={onPressHandler}
        loading={loading}
        disabled={loading}>
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
