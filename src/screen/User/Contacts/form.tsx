import React from 'react';
import {get} from 'lodash';
import {StyleSheet, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useMutation} from '@apollo/client';

import {useTranslation, global} from '../../../translate';

import {authClient} from '../../../clients';
import {addContact} from '../../../schemas';

const Form = ({newContact}: {newContact: (contact: any) => void}) => {
  const [value, setValue] = React.useState('');
  const [request, {data, loading}] = useMutation(addContact, {
    client: authClient,
  });
  const {tr} = useTranslation();

  const onChangeText = (text: string) => {
    setValue(text);
  };

  const onPress = () => {
    if (value.length > 2) {
      request({variables: {contact: {value}}});
      setValue('');
    }
  };

  React.useEffect(() => {
    if (get(data, 'addProfileContact')) {
      newContact(get(data, 'addProfileContact'));
    }
  }, [data, newContact]);

  return (
    <View style={style.form}>
      <TextInput value={value} onChangeText={onChangeText} mode="outlined" />
      <Button onPress={onPress} loading={loading}>
        {tr(global, 'save')}
      </Button>
    </View>
  );
};

const style = StyleSheet.create({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default Form;
