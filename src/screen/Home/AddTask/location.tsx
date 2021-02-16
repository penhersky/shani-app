import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, RadioButton, Subheading, Caption} from 'react-native-paper';
import Sceleton from 'react-native-skeleton-placeholder';

import {useTranslation, task} from '../../../translate';
import {useTheme} from '../../../theme';

import {WhiteOrDark} from './../../../theme';

import getLocation from '../../../lib/getLocation';

const Location = ({
  type,
  setType,
  onChangeValue,
}: {
  type: string;
  setType: (value: string) => void;
  onChangeValue: (location: {lat?: number; lng?: number; name: string}) => void;
}) => {
  const theme = useTheme();
  const [value, setValue] = React.useState<any>();
  const style = useStyle(theme);
  const {tr} = useTranslation();

  React.useEffect(() => {
    getLocation().then((data) => setValue({lan: data.lat, lng: data.lng}));
  }, []);

  const onValueChangeHandler = (newValue: string) => {
    setType(newValue);
    switch (newValue) {
      case 'place':
        onChangeValue({...value, name: 'place'});
        break;
      case 'profile-location':
        onChangeValue({...value, name: 'place'});
        break;
      case 'online':
        onChangeValue({name: 'online'});
        break;
      default:
        onChangeValue({name: 'other'});
        break;
    }
  };

  return (
    <View style={style.container}>
      <Subheading>{tr(task, 'type.title')}</Subheading>
      <RadioButton.Group onValueChange={onValueChangeHandler} value={type}>
        <View style={style.radio}>
          <RadioButton color={theme.colors.primary} value="place" />
          <Text>{tr(task, 'type.first')}</Text>
        </View>
        <View>
          {value ? (
            <>
              <Caption>{value?.lan}</Caption>
              <Caption>{value?.lng}</Caption>
            </>
          ) : (
            <Sceleton>
              <Sceleton.Item width={100} height={12} margin={5} />
            </Sceleton>
          )}
        </View>
        <View style={style.radio}>
          <RadioButton color={theme.colors.primary} value="online" />
          <Text>{tr(task, 'type.second')}</Text>
        </View>
        <View style={style.radio}>
          <RadioButton color={theme.colors.primary} value="profile-location" />
          <Text>{tr(task, 'type.third')}</Text>
        </View>
        <View style={style.radio}>
          <RadioButton color={theme.colors.primary} value="other" />
          <Text>{tr(task, 'type.other')}</Text>
        </View>
      </RadioButton.Group>
    </View>
  );
};

const useStyle = (theme: WhiteOrDark) =>
  StyleSheet.create({
    container: {
      marginVertical: 10,
    },
    radio: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

export default Location;
