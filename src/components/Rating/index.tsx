import React from 'react';
import _ from 'lodash';
import {View, StyleSheet} from 'react-native';

import Star from 'react-native-vector-icons/MaterialIcons';

import {useTheme} from '../../theme';

const Rating = ({
  size = 40,
  value = 0,
  onPress,
  styles,
  color,
}: {
  size?: number;
  value?: number;
  onPress?: (value: number) => void;
  styles?: any;
  color?: string;
}) => {
  const theme = useTheme();
  const rating = Math.round(value);

  return (
    <View style={[style.container, styles]}>
      {_.map(Array(5), (_value, i: number) =>
        i < rating ? (
          <Star
            name="star"
            size={size}
            key={i}
            onPress={() => onPress && onPress(i + 1)}
            color={color ?? theme.colors.gold}
          />
        ) : (
          <Star
            name="star-border"
            size={size}
            key={i}
            onPress={() => onPress && onPress(i + 1)}
            color={color ?? theme.colors.gold}
          />
        ),
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Rating;
