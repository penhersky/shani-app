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
  Switch,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import {Link} from '../../components';

import {avatarText} from '../../lib/format';
import {useTranslation, user as text, screenTitle} from '../../translate';
import screens from '../../lib/screens';
import {SET_THEME} from '../../../redux/types/settings';
import style from './style';
import {getTheme} from '../../theme';

const Panel = (): JSX.Element => {
  const {tr} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {user, admin, type} = useSelector((state: any) => state.user);
  const {theme} = useSelector((state: any) => state.settings);

  const uri = type === 'admin' ? admin?.imageUrl : user.image;
  const account = type === 'admin' ? admin : user;

  const onChangeTheme = () =>
    dispatch({
      type: SET_THEME,
      theme: theme === 'dark' ? 'white' : 'dark',
    });

  const onPressSettings = () => {
    navigation.navigate(screens.settings);
  };

  return (
    <ScrollView style={style.container}>
      <Link to={screens.userProfile}>
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
            <Icon name="arrow-forward" size={16} color={getTheme.colors.text} />
          </View>
        </View>
      </Link>
      <Divider />
      <List.Section>
        <List.Item
          title={tr(screenTitle, 'settings')}
          onPress={onPressSettings}
          left={() => (
            <Icon name="settings-sharp" size={25} style={style.icon} />
          )}
        />
        <List.Item
          title={tr(text, 'theme')}
          description={tr(text, 'themeDescription')}
          left={() => (
            <Switch
              style={style.switch}
              value={theme === 'dark'}
              onValueChange={onChangeTheme}
            />
          )}
        />
        <Divider />
      </List.Section>
    </ScrollView>
  );
};

export default Panel;
