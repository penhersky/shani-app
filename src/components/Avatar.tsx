import React from 'react';
import {Avatar} from 'react-native-paper';

import {avatarText} from '../lib/format';

const User = ({
  image,
  name,
  size,
  styles,
}: {
  image?: string;
  name: string;
  size: number;
  styles?: any;
}) => {
  return image ? (
    <Avatar.Image size={size} source={{uri: image}} style={styles} />
  ) : (
    <Avatar.Text size={size} label={avatarText(name)} style={styles} />
  );
};

export default User;
