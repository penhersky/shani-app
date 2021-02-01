import React from 'react';
import {get, nth} from 'lodash';
import {TextInput, Button, Text} from 'react-native-paper';
import {useMutation} from '@apollo/client';

import {useTranslation, auth} from '../../../translate';
import {authClient} from '../../../clients';

import validation from '../../../lib/validation';
import {capitalize} from '../../../lib/format';
import {singUp} from '../../../schemas/auth';

import Wrapp from '../Wrapp';

import style from '../style';

const SingUp = ({route, navigation}: any) => {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [err, setErr] = React.useState('');
  const [msg, setMsg] = React.useState('');
  const {tr} = useTranslation();
  const [request, {loading, data, error}] = useMutation(
    singUp(route.params.type),
    {
      client: authClient,
    },
  );

  const onChangeEmail = (text: string) => setEmail(text);
  const onChangeName = (text: string) => setName(text);
  const onPressHandler = () => {
    const validName = validation.name(name);
    if (validName) {
      setErr('name');
      return setMsg(
        validName === 'len'
          ? tr(auth, 'errors.shortName')
          : tr(auth, 'errors.namePattern'),
      );
    }
    const validEmail = validation.email(email);
    if (validEmail) {
      setErr('email');
      return setMsg(tr(auth, 'errors.email'));
    }
    setErr('');
    setMsg('');
    request({variables: {email, name}});
  };

  React.useEffect(() => {
    if (data) {
      const result = get(data, `singUp${capitalize(route.params.type)}`);
      if (get(result, 'result') === 'SUCCESS') {
        navigation.navigate('CodeInput', {
          token: get(result, 'token'),
        });
      }
    }
  }, [data, route.params.type, navigation]);

  React.useEffect(() => {
    if (data) {
      const result = get(data, `singUp${capitalize(route.params.type)}`);
      const field = nth([...get(result, 'fields')]) || 'email';
      setErr(field);
      if (Number(get(result, 'status')) === 45) {
        return setMsg(
          field === 'email'
            ? tr(auth, 'errors.email')
            : tr(auth, 'errors.namePattern'),
        );
      }
      if (Number(get(result, 'status')) === 44) {
        setMsg(tr(auth, 'errors.userExist'));
      }
    }
  }, [data, route.params.type, tr]);

  React.useEffect(() => {
    if (error) {
      navigation.navigate('NetworkError', {
        type: route.params.type,
        to: 'SingUp',
      });
    }
  }, [error, navigation, route.params.type]);

  return (
    <Wrapp title={tr(auth, 'SingUpTitle')(route.params.type)}>
      <Text style={style.errText}>{msg ? msg : ''}</Text>
      <TextInput
        style={style.input}
        label={tr(auth, 'name')}
        onChangeText={onChangeName}
        error={err === 'name'}
        mode="outlined"
        value={name}
        left={<TextInput.Icon name="account" />}
      />
      <TextInput
        style={style.input}
        label={tr(auth, 'email')}
        onChangeText={onChangeEmail}
        error={err === 'email'}
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
