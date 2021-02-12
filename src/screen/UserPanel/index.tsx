import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
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
import openUrl from '../../lib/openUrl';
import {useTranslation, user as text, screenTitle} from '../../translate';
import screens from '../../lib/screens';
import style from './style';
import {useTheme} from '../../theme';

import {query, tokenSchemas, useDataBase} from '../../wrappers/db';

import {SET_AUTH} from '../../../redux/types/user';

const Panel = (): JSX.Element => {
  const {tr} = useTranslation();
  const theme = useTheme();
  const db = useDataBase();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {user, admin, type} = useSelector((state: any) => state.user);

  const uri = type === 'admin' ? admin?.imageUrl : user.image;
  const account = type === 'admin' ? admin : user;

  const onPressSettings = () => {
    navigation.navigate(screens.settings);
  };

  const onPressLogOut = () => {
    dispatch({type: SET_AUTH, isAuthorized: false});
    query(db, tokenSchemas.deleteByUser(user.id));
  };

  const onPressAbout = () => openUrl('WebUrl');
  const onPressFAQ = () => openUrl('WebUrl');

  return (
    <ScrollView style={style.container}>
      <Link to={screens.userProfile} params={{userId: account.id, type}}>
        <View style={style.userContainer}>
          <View style={style.user}>
            {uri ? (
              <Avatar.Image size={120} source={{uri}} />
            ) : (
              <Avatar.Text size={120} label={avatarText(account.name)} />
            )}

            <Title>{account.name}</Title>
            <Text>{account.email}</Text>
          </View>
          <View style={style.toAcc}>
            <Paragraph>{tr(text, 'toAccount')}</Paragraph>
            <Icon name="arrow-forward" size={14} color={theme.colors.text} />
          </View>
        </View>
      </Link>
      <Divider />
      <List.Section>
        <List.Item
          title={tr(screenTitle, 'settings')}
          onPress={onPressSettings}
          left={() => (
            <Icon
              name="settings-sharp"
              size={25}
              style={style.icon}
              color={theme.colors.text}
            />
          )}
        />
        <List.Item
          title={tr(text, 'logout')}
          onPress={onPressLogOut}
          left={() => (
            <Icon
              name="exit-outline"
              size={25}
              style={style.icon}
              color={theme.colors.text}
            />
          )}
        />
        <Divider />
        <List.Item
          title={'FAQ'}
          onPress={onPressFAQ}
          left={() => (
            <Icon
              name="help-circle"
              size={25}
              style={style.icon}
              color={theme.colors.text}
            />
          )}
        />
        <List.Item
          title={tr(text, 'aboutAs')}
          onPress={onPressAbout}
          left={() => (
            <Icon
              name="information-circle"
              size={25}
              style={style.icon}
              color={theme.colors.text}
            />
          )}
        />
      </List.Section>
    </ScrollView>
  );
};

export default Panel;
