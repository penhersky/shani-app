import React from 'react';
import {TextInput, Button, Text} from 'react-native-paper';
import {useLazyQuery} from '@apollo/client';

import {useTranslation, auth} from '../../../translate';
import {authClient} from '../../../clients';

import validation from '../../../lib/validation';
import {singUp} from '../../../schemas/auth';

import Wrapp from '../Wrapp';

import style from '../style';

const SingUp = ({route}: any) => {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [err, setErr] = React.useState(false);
  const {tr} = useTranslation();
  const [request, {loading, data, error}] = useLazyQuery(
    singUp(route.params.type),
    {
      client: authClient,
    },
  );

  const onChangeEmail = (text: string) => setEmail(text);
  const onChangeName = (text: string) => setName(text);
  const onPressHandler = () => {
    const validEmail = validation.email(email);
    if (validEmail) {
      return setErr(true);
    }
    setErr(false);
    // request({variables: {email, name}});
  };

  return (
    <Wrapp title={tr(auth, 'SingUp')}>
      <Text style={style.errText}>
        {err || Boolean(error) ? tr(auth, 'error') : ''}
      </Text>
      <TextInput
        style={style.input}
        label={tr(auth, 'name')}
        onChangeText={onChangeName}
        error={err || Boolean(error)}
        mode="outlined"
        value={name}
        left={<TextInput.Icon name="account" />}
      />
      <TextInput
        style={style.input}
        label={tr(auth, 'email')}
        onChangeText={onChangeEmail}
        error={err || Boolean(error)}
        mode="outlined"
        value={email}
        left={<TextInput.Icon name="email" />}
      />
      <Button
        mode="outlined"
        style={style.button}
        onPress={onPressHandler}
        loading={loading}
        disabled={loading}>
        {tr(auth, 'SingUp')}
      </Button>
    </Wrapp>
  );
};

export default SingUp;
