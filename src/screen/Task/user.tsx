import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {Subheading, Card, Button, TouchableRipple} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Gradient from 'react-native-linear-gradient';

import {statuses, useTranslation} from '../../translate';
import {useTheme, WhiteOrDark} from '../../theme';
import screen from '../../lib/screens';
import {getPerformerStyles} from '../../lib/getStyle';

import {Avatar, Rating, Alert} from '../../components';
import {Vote} from '../../modules';

const User = ({
  user,
  rating,
  style,
  involved,
  isPerformer,
  status,
}: {
  user: any;
  style: any;
  rating?: number;
  isPerformer: boolean;
  involved: boolean;
  status: string;
}) => {
  const [visible, setVisible] = React.useState(false);
  const navigate = useNavigation();
  const theme = useTheme();
  const {tr} = useTranslation();

  const onOkHandler = () => {
    alert('ok');
  };

  const {color, icon} = getPerformerStyles(status, theme, 35);

  return (
    <Gradient
      style={[style.wrap, {borderColor: color}]}
      colors={[
        theme.colors.surface,
        involved && icon ? color : theme.colors.accent,
      ]}
      start={{x: 1.44, y: 1.55}}
      end={{x: 1.69, y: 1.0}}>
      <View style={style.wrapIcon}>{icon}</View>
      <TouchableRipple
        onPress={() => {
          navigate.navigate(screen.userProfile, {userId: user.id});
        }}>
        <>
          <Alert
            setVisible={setVisible}
            visible={visible}
            onCancel={() => {}}
            onOk={onOkHandler}
            title={isPerformer && tr(statuses, 'info.cancel')}
            subTitle={
              !isPerformer && tr(statuses, 'info.cancelPerformer')(user.name)
            }
          />

          <Card.Content style={style.cart}>
            <Avatar name={user.name} size={70} image={user.image} />
            <Subheading>{user.name}</Subheading>
            {rating && <Rating value={rating} size={20} styles={{margin: 2}} />}
            {involved && (
              <Button onPress={() => setVisible(true)} mode="outlined">
                {tr(
                  statuses,
                  `action.${isPerformer ? 'refuse' : 'cancelPerformer'}`,
                )}
              </Button>
            )}
          </Card.Content>
        </>
      </TouchableRipple>
    </Gradient>
  );
};

const Component = ({
  id,
  status,
  performer,
  performerRating,
  customer,
  customerRating,
}: {
  id: string;
  performer?: any;
  performerRating?: any;
  customer: any;
  customerRating?: any;
  status: string;
}) => {
  const {user} = useSelector((s: any) => s.user);
  const isCostumer = user.id === customer?.id;
  const isPerformer = user.id === performer?.id;
  const involved = isCostumer || isPerformer;
  const theme = useTheme();
  const style = useStyle(theme);

  return (
    <View>
      <View style={style.user}>
        {!isCostumer && (
          <User
            style={style}
            user={customer}
            rating={customerRating?.score}
            involved={involved}
            isPerformer={isPerformer}
            status={status}
          />
        )}
        {performer && !isPerformer && (
          <User
            style={style}
            user={performer}
            rating={performerRating?.score}
            involved={involved}
            isPerformer={isPerformer}
            status={status}
          />
        )}
      </View>
      {involved && ['done', 'closed'].includes(status) && (
        <Vote
          id={id}
          size={35}
          score={isCostumer ? customerRating?.score : performerRating?.score}
        />
      )}
    </View>
  );
};

const useStyle = (theme: WhiteOrDark) =>
  StyleSheet.create({
    user: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
    wrap: {
      borderWidth: 1,
      borderRadius: theme.borderRadius,
      borderColor: theme.colors.disabled,
      padding: 5,
      alignSelf: 'stretch',
      width: '100%',
      flex: 1,
      margin: 2,
      overflow: 'hidden',
    },
    wrapIcon: {
      position: 'absolute',
      top: 5,
      right: 7,
    },
    cart: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: 3,
      paddingTop: 5,
      flex: 1,
      overflow: 'hidden',
    },
    cancel: {
      position: 'absolute',
      top: 0,
      right: 1,
    },
  });

export default Component;
