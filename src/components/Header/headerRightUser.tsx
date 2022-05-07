import React from 'react';
import _ from 'lodash';
import {useSelector} from 'react-redux';
import {View, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Avatar, IconButton, Badge} from 'react-native-paper';

import {useDataBase, query, notificationSchemas} from '../../wrappers/db';
import {avatarText} from '../../lib/format';
import screens from '../../lib/screens';

const Header = () => {
  const navigation = useNavigation();
  const db = useDataBase();
  const {user, admin, type} = useSelector((state: any) => state.user);
  const [count, setCount] = React.useState(0);

  const uri = type === 'admin' ? admin?.imageUrl : user.image;

  const onPressBell = () => {
    navigation.navigate(screens.notifications);
  };
  const onPressUser = () => {
    navigation.navigate(screens.userPanel);
  };

  React.useEffect(() => {
    query(db, notificationSchemas.newCount).then(({row}) => {
      setCount(_.get(_.nth(row, 0), 'COUNT(*)'));
    });
  }, [db]);

  return (
    <>
      <View style={style.container}>
        <View style={style.bell}>
          <Badge visible={Boolean(count)} style={style.badge}>
            {count > 99 ? '99+' : count}
          </Badge>
          <IconButton icon="bell" size={35} onPress={onPressBell} />
        </View>
        <TouchableNativeFeedback onPress={onPressUser}>
          {uri ? (
            <Avatar.Image size={40} source={{uri}} />
          ) : (
            <Avatar.Text
              size={40}
              label={avatarText(type === 'admin' ? admin.name : user.name)}
            />
          )}
        </TouchableNativeFeedback>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    width: 100,
    height: 50,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  bell: {
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    overflow: 'hidden',
    top: '55%',
    right: 7,
  },
});

export default Header;
