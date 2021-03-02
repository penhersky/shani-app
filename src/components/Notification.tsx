import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {
  Text,
  Subheading,
  IconButton,
  Avatar,
  TouchableRipple,
} from 'react-native-paper';

import {useTheme, WhiteOrDark} from '../theme';
import {avatarText} from '../lib/format';

import {Notification} from '../../redux/types/notification';

const Component = ({
  notification: {image, title, time, revised},
}: {
  notification: Notification;
}) => {
  const [revise, setReVice] = React.useState(revised);
  const theme = useTheme();
  const style = useStyle(theme);

  const onPressOption = () => {};

  return (
    <TouchableRipple
      style={[style.container, !revise && style.revised]}
      onPress={!revise ? () => setReVice(true) : undefined}>
      <>
        {image ? (
          <Image source={{uri: image}} style={style.image} />
        ) : (
          <Avatar.Text
            size={50}
            label={avatarText(title)}
            style={{margin: 6}}
          />
        )}
        <View style={style.content}>
          <Subheading>{title}</Subheading>
          <Text>{time}</Text>
        </View>
        <IconButton icon="dots-vertical" onPress={onPressOption} />
      </>
    </TouchableRipple>
  );
};

const useStyle = (theme: WhiteOrDark) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: 5,
      margin: 3,
      overflow: 'hidden',
      borderRadius: theme.borderRadius,
    },
    revised: {
      backgroundColor: theme.colors.disabled,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 25,
      margin: 6,
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      flex: 1,
    },
  });

export default Component;
