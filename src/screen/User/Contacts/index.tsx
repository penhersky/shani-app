import React from 'react';
import _ from 'lodash';
import {StyleSheet, View} from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import Skeleton from 'react-native-skeleton-placeholder';

import Form from './form';

const Contacts = ({
  contacts,
  allowed,
}: {
  contacts: {
    id: string;
    name: string;
    value?: string;
    icon?: string;
    show?: boolean;
  }[];
  allowed: boolean;
}) => {
  const [list, setList] = React.useState<any[]>(contacts);

  const addContact = (contact: any) => {
    setList([...list, contact]);
  };

  return (
    <Card>
      <Card.Content>
        <View>
          {_.map([...(contacts || []), ...list], (item: any) => (
            <Paragraph key={item.id}>{item.value}</Paragraph>
          ))}
        </View>
        {allowed && <Form newContact={addContact} />}
      </Card.Content>
    </Card>
  );
};

const style = StyleSheet.create({});

export default Contacts;
