import React from 'react';
import _ from 'lodash';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {View, ScrollView} from 'react-native';
import {Text, Title, Avatar, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import {avatarText} from '../../lib/format';
import {useTranslation} from '../../translate';
import screens from '../../lib/screens';

import useStyle from './style';

import {useTheme} from '../../theme';

export {default as HeaderRight} from './rightHeader';

const Panel = ({route}: any): JSX.Element => {
  const userId = _.get(route?.params, 'userId');
  const {tr} = useTranslation();
  const theme = useTheme();
  const style = useStyle(theme);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {user, admin, type} = useSelector((state: any) => state.user);

  const [account, setAccount] = React.useState();

  return (
    <ScrollView>
      {/* <View>
        <View>
          {uri ? (
            <Avatar.Image size={120} source={{uri}} />
          ) : (
            <Avatar.Text size={120} label={avatarText(account.name)} />
          )}

          <Title>{account.name}</Title>
          <Text>{account.email}</Text>
        </View>
      </View>
      <Divider /> */}
      <Text>User</Text>
    </ScrollView>
  );
};

export default Panel;
