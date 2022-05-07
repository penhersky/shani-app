import React from 'react';
import _ from 'lodash';
import {StyleSheet, View} from 'react-native';
import {Card, TextInput, Button} from 'react-native-paper';
import {useMutation} from '@apollo/client';

import {authClient} from '../../../clients';
import {addContact} from '../../../schemas';

import {useTranslation, global} from '../../../translate';

import List from './list';

type Contact = {
  id: string;
  name: string;
  value?: string;
  icon?: string;
  show?: boolean;
};

const Contacts = ({
  contacts,
  allowed,
  setContacts,
}: {
  contacts: Contact[];
  allowed: boolean;
  setContacts: (cb: (contacts: Contact[]) => Contact[]) => void;
}) => {
  const {tr} = useTranslation();
  const [value, setValue] = React.useState('');
  const [add, {data, loading}] = useMutation(addContact, {
    client: authClient,
  });

  const onChangeText = (text: string) => {
    setValue(text);
  };

  const onPress = () => {
    if (value.length > 2) {
      add({variables: {contact: {value}}});
      setValue('');
    }
  };

  const onDeleteHandler = (id: string) => {
    setContacts((list: Contact[]) =>
      _.filter(list, (item: any) => item.id !== id),
    );
  };

  React.useEffect(() => {
    if (_.get(data, 'addProfileContact')) {
      setContacts((list: Contact[]) => [
        ...list,
        _.get(data, 'addProfileContact'),
      ]);
    }
  }, [data, setContacts]);

  return (
    <Card>
      <Card.Content>
        <List
          contacts={contacts}
          allowed={allowed}
          onDelete={onDeleteHandler}
        />
        {allowed && (
          <View style={style.form}>
            <TextInput
              value={value}
              onChangeText={onChangeText}
              mode="outlined"
            />
            <Button onPress={onPress} loading={loading}>
              {tr(global, 'add')}
            </Button>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const style = StyleSheet.create({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default Contacts;
