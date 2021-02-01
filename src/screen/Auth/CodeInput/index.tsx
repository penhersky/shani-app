import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useLazyQuery} from '@apollo/client';
import {
  CodeField,
  useClearByFocusCell,
  useBlurOnFulfill,
  Cursor,
} from 'react-native-confirmation-code-field';

import {useTranslation, auth, global} from '../../../translate';
import {getTheme} from '../../../theme';

import {authClient} from '../../../clients';
import {code} from '../../../schemas/auth';

import Wrapp from '../Wrapp';

import style from '../style';

const Code = ({route, navigation}: any) => {
  const [value, setValue] = React.useState('');
  const [err, setErr] = React.useState(false);
  const {tr} = useTranslation();
  const ref = useBlurOnFulfill({value, cellCount: 6});
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [request, {loading, data, error}] = useLazyQuery(code, {
    client: authClient,
  });

  const onPressHandler = () => {
    if (value.length !== 6) {
      setErr(true);
    }
    setErr(false);
    request({variables: {code: value, token: route.params.token}});
  };

  React.useEffect(() => {
    if (data) {
      console.log(data);
      if (data?.verifyCode.result === 'SUCCESS') {
        return navigation.navigate('CreatePass', {
          token: data?.verifyCode?.token,
        });
      }
      setErr(true);
    }
  }, [data, route.params.type, navigation]);
  return (
    <Wrapp title={tr(auth, 'codeTitle')} titleSize={24} height={300}>
      <CodeField
        ref={ref}
        {...prop}
        value={value}
        cellCount={6}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        onChangeText={setValue}
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[
              styles.cell,
              isFocused && styles.focusCell,
              (err || error) && styles.error,
            ]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
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

const styles = StyleSheet.create({
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: getTheme.colors.accent,
    color: getTheme.colors.surface,
    textAlign: 'center',
    marginHorizontal: 7,
  },
  focusCell: {
    borderColor: getTheme.colors.primary,
  },
  error: {
    borderColor: getTheme.colors.error,
  },
});

export default Code;
