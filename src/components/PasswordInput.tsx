import React from 'react';
import {TextInput} from 'react-native-paper';

const Input = ({
  value,
  onChangePass,
  style = {},
  err = false,
}: {
  value: string;
  onChangePass: any;
  style?: any;
  err?: boolean;
}) => {
  const [show, setShow] = React.useState(false);
  return (
    <TextInput
      style={style}
      label="password"
      mode="outlined"
      onChangeText={onChangePass}
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
