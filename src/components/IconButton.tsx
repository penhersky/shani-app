import React from 'react';
import {TouchableRipple} from 'react-native-paper';

const Icon = ({
  icon,
  onPress,
  styles,
}: {
  icon: any;
  onPress: () => void;
  styles?: any;
}) => {
  return (
    <TouchableRipple onPress={onPress} style={[styles]}>
      {icon}
    </TouchableRipple>
  );
};

export default Icon;
