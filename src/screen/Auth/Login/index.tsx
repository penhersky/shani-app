import React from 'react';
import {useDispatch} from 'react-redux';
import {TextInput, Button, Text} from 'react-native-paper';
import {useLazyQuery} from '@apollo/client';

import {useTranslation, auth} from '../../../translate';
import {authClient} from '../../../clients';

import validation from '../../../lib/validation';
import {login} from '../../../schemas/auth';

import {useDataBase, insert, tokenSchemas} from '../../../wrappers/db';

import {PassInput} from '../../../components';
import Wrapp from '../Wrapp';

import style from '../style';

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
        route.params?.authorized();
        return;
      }
      setErr(true);
    }
  }, [data, db, dispatch, route.params]);

  return (
    <Wrapp title={tr(auth, 'login')}>
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
        {tr(auth, 'login')}
      </Button>
    </Wrapp>
  );
};

export default Login;
