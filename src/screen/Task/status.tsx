import React from 'react';
import _ from 'lodash';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Subheading} from 'react-native-paper';
import {useMutation} from '@apollo/client';

import {useTranslation, statuses} from '../../translate';
import {useTheme, WhiteOrDark} from '../../theme';

import {Picker, Spinner} from '../../components';
import {getCustomerList, getPerformerList} from './statusList';
import {getTaskStatus} from '../../lib/getStyle';
import {AntDesign, size} from '../../lib/icon';
import {task} from '../../schemas';
import {PUT_TASK} from '../../../redux/types/task';

const StatusPiker = ({
  id,
  status,
  performer,
  customer,
}: {
  id: string;
  performer?: any;
  customer?: any;
  status: string;
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const style = useStyle(theme);
  const {tr} = useTranslation();
  const [state, setState] = React.useState<string>(status);
  const [oldStatus, setOld] = React.useState<string>(status);
  const {user} = useSelector((s: any) => s.user);
  const isCostumer = user.id === customer?.id;
  const involved = isCostumer || user.id === performer?.id;

  const [setStatus, {data, error, loading}] = useMutation(task.setStatus);

  const onChangeHandler = (value: string) => {
    setState(value);
    setStatus({variables: {id, status: value}});
  };

  React.useEffect(() => {
    if (_.get(data, 'setOrderStatus.result') === 'SUCCESS') {
      setOld(state);
      dispatch({
        type: PUT_TASK,
        id,
        task: {status: state},
      });
    }
    if (_.get(data, 'setOrderStatus.result') === 'ERROR' || error) {
      setState(oldStatus);
    }
  }, [data, setStatus, oldStatus, state, error, dispatch, id]);

  const {icon, color} = getTaskStatus(state, theme, size.medium);

  return involved ? (
    <>
      <Picker
        list={
          isCostumer ? getCustomerList(state, tr) : getPerformerList(state, tr)
        }
        onChange={onChangeHandler}
        value={state}
        styles={[
          style.performerPicker,
          {borderColor: state === 'created' ? theme.colors.text : color},
        ]}>
        <>
          {state === 'created' ? (
            <>
              <AntDesign
                name="switcher"
                size={size.medium}
                color={theme.colors.text}
              />
              {loading && <Spinner size={20} />}
              <Subheading>{tr(statuses, 'status')}</Subheading>
            </>
          ) : (
            <>
              {icon}
              {loading && <Spinner size={20} />}
              <Subheading>{tr(statuses, `statuses.${state}`)}</Subheading>
            </>
          )}
        </>
      </Picker>
    </>
  ) : (
    <></>
  );
};

const useStyle = (theme: WhiteOrDark) =>
  StyleSheet.create({
    performerPicker: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 10,
      marginVertical: 10,
      borderRadius: theme.borderRadius,
      borderWidth: 1,
      overflow: 'hidden',
    },
    spinner: {
      alignSelf: 'center',
      top: 10,
    },
  });

export default StatusPiker;
