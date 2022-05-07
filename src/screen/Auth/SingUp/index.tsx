import React from 'react';
import {get, nth} from 'lodash';
import {TextInput, Button, Text} from 'react-native-paper';
import {useMutation} from '@apollo/client';
import DateTimePicker from '@react-native-community/datetimepicker';

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
  const [date, setDate] = React.useState<Date>(new Date());
  const [show, setShow] = React.useState<boolean>(false);
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

    const birthday = new Date(date);
    const allowed = new Date();
    allowed.setMonth(allowed.getMonth() - 12 * 16);

    if (Number(birthday) > Number(allowed)) {
      setErr('date');
      return setMsg(tr(auth, 'errors.date'));
    }

    setErr('');
    setMsg('');
    request({variables: {email, name, birthday: date}});
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
      if (get(result, 'result') === 'ERROR') {
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
    }
  }, [data, route.params.type, tr]);

  React.useEffect(() => {
    if (error) {
      navigation.navigate('NetworkError');
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
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          maximumDate={new Date()}
          display="spinner"
          onChange={(_: any, selectedDate: any) => {
            setDate(selectedDate || date);
            setShow(false);
          }}
        />
      )}

      <Button
        mode="outlined"
        style={[style.button, err === 'date' && style.buttonError]}
        onPress={() => setShow(true)}
        disabled={loading}>
        {date.toLocaleDateString()}
      </Button>

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
