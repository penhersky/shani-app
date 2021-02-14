import React from 'react';
import {map} from 'lodash';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Paragraph, IconButton} from 'react-native-paper';
import {useMutation} from '@apollo/client';
import Skeleton from 'react-native-skeleton-placeholder';

import {authClient} from '../../../clients';
import {deleteContact} from '../../../schemas';

const List = ({
  contacts,
  allowed,
  onDelete,
}: {
  contacts?: {
    id: string;
    name: string;
    value?: string;
    icon?: string;
    show?: boolean;
  }[];
  allowed: boolean;
  onDelete: (id: string) => void;
}) => {
  const [del] = useMutation(deleteContact, {
    client: authClient,
  });

  const onPressDelete = (id: any) => {
    del({variables: {id}});
    onDelete(id);
  };

  if (!contacts) {
    const props = {
      width: Dimensions.get('window').width - 100,
      marginVertical: 5,
      height: 20,
      ...style.show,
    };
    return (
      <Skeleton>
        <Skeleton.Item {...props} />
        <Skeleton.Item {...props} />
        <Skeleton.Item {...props} />
      </Skeleton>
    );
  }

  return (
    <View>
      {map(contacts, (item: any) => (
        <View style={[allowed ? style.edit : style.show]} key={item.id}>
          <Paragraph>{item.value}</Paragraph>
          {allowed && (
            <IconButton icon="delete" onPress={() => onPressDelete(item.id)} />
          )}
        </View>
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  show: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  edit: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default List;
