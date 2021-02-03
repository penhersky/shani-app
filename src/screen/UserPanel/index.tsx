import React from 'react';
import {useSelector} from 'react-redux';
import {View, ScrollView} from 'react-native';
import {
  Text,
  Title,
  Avatar,
  Divider,
  Paragraph,
  List,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import {Link} from '../../components';

import {avatarText} from '../../lib/format';
import screens from '../../lib/screens';
import style from './style';

const Panel = (): JSX.Element => {
  const {user, admin, type} = useSelector((state: any) => state.user);

  const uri = type === 'admin' ? admin?.imageUrl : user.image;
  const account = type === 'admin' ? admin : user;

  return (
    <ScrollView style={style.container}>
      <Link to={screens.userProfile}>
        <View style={style.userContainer}>
          <View style={style.user}>
            {uri ? (
              <Avatar.Image size={120} source={{uri}} />
            ) : (
              <Avatar.Text
                size={120}
                label={avatarText(type === 'admin' ? admin.name : user.name)}
              />
            )}

            <Title>{account.name}</Title>
            <Text>{account.email}</Text>
          </View>
          <View style={style.toAcc}>
            <Paragraph>Go to my account</Paragraph>
            <Icon name="arrow-forward" size={16} />
          </View>
        </View>
      </Link>
      <Divider />
      <List.Section>
        <List.Item
          title="First Item"
          left={() => <List.Icon icon="folder" />}
        />
        <List.Item
          title="Second Item"
          left={() => <List.Icon color="#000" icon="folder" />}
        />
      </List.Section>
    </ScrollView>
  );
};

export default Panel;
