import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Subheading} from 'react-native-paper';
import {useMutation} from '@apollo/client';

import {useTranslation, statuses} from '../../translate';
import {useTheme, WhiteOrDark} from '../../theme';

import {Picker} from '../../components';
import {getList} from './statusList';
import {getTaskStatus} from '../../lib/getStyle';
import {AntDesign, size} from '../../lib/icon';

const StatusPiker = ({
  status,
  performer,
  customer,
}: {
  performer?: any;
  customer?: any;
  status: string;
}) => {
  const theme = useTheme();
  const style = useStyle(theme);
  const {tr} = useTranslation();
  const [state, setState] = React.useState(status);
  const {user} = useSelector((s: any) => s.user);
  const isCostumer = user.id === customer?.id;

  // const [request, {data}] = useMutation();

  const onChangeHandler = (value: string) => {
    setState(value);
  };

  const {icon, color} = getTaskStatus(state, theme, size.medium);

  return isCostumer ? (
    <Picker
      list={getList(state, tr)}
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
            <Subheading>{tr(statuses, 'status')}</Subheading>
          </>
        ) : (
          <>
            {icon}
            <Subheading>{tr(statuses, `statuses.${state}`)}</Subheading>
          </>
        )}
      </>
    </Picker>
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
    },
  });

export default StatusPiker;
