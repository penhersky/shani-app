import React from 'react';
import _ from 'lodash';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {useMutation} from '@apollo/client';
import {Subheading, Card, Button, TouchableRipple} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Gradient from 'react-native-linear-gradient';

import {statuses, useTranslation} from '../../translate';
import {useTheme, WhiteOrDark} from '../../theme';
import screen from '../../lib/screens';
import {getPerformerStyles} from '../../lib/getStyle';
import {PUT_TASK} from '../../../redux/types/task';
import {task} from '../../schemas';

import {Avatar, Rating, Alert, Spinner} from '../../components';
import {Vote} from '../../modules';

const User = ({
  user,
  rating,
  style,
  involved,
  isPerformer,
  status,
  onDeletePerformer,
}: {
  user: any;
  style: any;
  rating?: number;
  isPerformer: boolean;
  involved: boolean;
  status: string;
  onDeletePerformer?: () => void;
}) => {
  const [visible, setVisible] = React.useState(false);
  const navigate = useNavigation();
  const theme = useTheme();
  const {tr} = useTranslation();

  const {color, icon} = getPerformerStyles(status, theme, 35);

  return (
    <Gradient
      style={[style.wrap, {borderColor: color}]}
      colors={[
        theme.colors.surface,
        !isPerformer && icon ? color : theme.colors.accent,
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
            onOk={onDeletePerformer}
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
                {tr(statuses, 'action.cancelPerformer')}
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
  const [worker, setWorker] = React.useState(performer);
  const {user} = useSelector((s: any) => s.user);
  const dispatch = useDispatch();
  const theme = useTheme();
  const style = useStyle(theme);

  const [cancelPerformer, {data, error, loading}] = useMutation(
    task.cancelPerformer,
  );

  const isCostumer = user.id === customer?.id;
  const isPerformer = user.id === performer?.id;
  const involved = isCostumer || isPerformer;

  const onDeleteHandler = () => {
    dispatch({
      type: PUT_TASK,
      id,
      task: {
        performer: null,
      },
    });
    cancelPerformer({variables: {id}});
  };

  React.useEffect(() => {
    if (_.get(data, 'cancelOrderPerformer.result') === 'SUCCESS' && !error) {
      setWorker(null);
      dispatch({
        type: PUT_TASK,
        id,
        task: {
          performer: null,
        },
      });
    } else {
      setWorker(performer);
    }
  }, [dispatch, data, error, id, performer]);

  return (
    <View>
      <View style={style.user}>
        {loading && <Spinner absolute />}
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
        {worker && !isPerformer && (
          <User
            style={style}
            user={performer}
            rating={performerRating?.score}
            involved={involved}
            isPerformer={isPerformer}
            status={status}
            onDeletePerformer={onDeleteHandler}
          />
        )}
      </View>
      {involved && ['done', 'closed'].includes(status) && performer && (
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
      overflow: 'hidden',
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
