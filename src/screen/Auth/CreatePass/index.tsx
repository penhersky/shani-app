import React from 'react';
import {Button, Text} from 'react-native-paper';
import {useMutation} from '@apollo/client';

import {useTranslation, auth, global} from '../../../translate';

import {authClient} from '../../../clients';
import {confirmPass} from '../../../schemas/auth';
import validation from '../../../lib/validation';

import {PassInput} from '../../../components';
import Wrapp from '../Wrapp';

import style from '../style';

const Pass = ({route, navigation}: any) => {
  const [pass, setPass] = React.useState('');
  const [repass, setrePass] = React.useState('');
  const [err, setErr] = React.useState(false);
  const [msg, setMsg] = React.useState('');
  const {tr} = useTranslation();
  const [request, {loading, data, error}] = useMutation(confirmPass, {
    client: authClient,
  });

  const onPressHandler = () => {
    const validName = validation.password(pass);
    if (validName) {
      setErr(true);
      return setMsg(
        validName === 'len'
          ? tr(auth, 'errors.shortPass')
          : tr(auth, 'errors.passPattern'),
      );
    }
    if (pass !== repass) {
      setErr(true);
      return setMsg(tr(auth, 'errors.passIdentity'));
    }
    setErr(false);
    request({variables: {password: pass, token: route.params.token}});
  };

  React.useEffect(() => {
    if (data) {
      console.log(data);
      if (data?.confirmRegistration.result === 'SUCCESS') {
        return navigation.navigate('Login');
      }
      setErr(true);
    }
  }, [data, route.params.type, navigation]);

  React.useEffect(() => {
    if (error) {
      navigation.navigate('NetworkError');
    }
  }, [error, navigation, route.params.type]);

  return (
    <Wrapp title={tr(auth, 'passTitle')} titleSize={24}>
      <Text style={style.errText}>{err ? msg : ''}</Text>
      <PassInput
        onChangePass={setPass}
        value={pass}
        style={style.input}
        err={err}
      />
      <PassInput
        onChangePass={setrePass}
        value={repass}
        style={style.input}
        err={err}
        label={tr(auth, 'repassword')}
      />
      <Button
        mode="outlined"
        style={style.button}
        onPress={onPressHandler}
        loading={loading}
        disabled={loading}>
        {tr(global, 'send')}
      </Button>
    </Wrapp>
  );
};

export default Pass;
