import React from 'react';
import {TextInput} from 'react-native-paper';

import {auth, useTranslation} from '../translate';

const Input = ({
  value,
  onChangePass,
  style = {},
  err = false,
  label,
}: {
  value: string;
  onChangePass: any;
  label?: string;
  style?: any;
  err?: boolean;
}) => {
  const {tr} = useTranslation();
  const [show, setShow] = React.useState(true);
  return (
    <TextInput
      style={style}
      mode="outlined"
      onChangeText={onChangePass}
      label={label || tr(auth, 'password')}
      error={err}
      value={value}
      secureTextEntry={show}
      left={
        <TextInput.Icon
          name={show ? 'lock' : 'lock-open'}
          onPress={() => setShow(!show)}
        />
      }
    />
  );
};

export default Input;
