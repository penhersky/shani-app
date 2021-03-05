import React from 'react';
import {Avatar} from 'react-native-paper';

import {avatarText} from '../lib/format';

const User = ({
  image,
  name,
  size,
}: {
  image?: string;
  name: string;
  size: number;
}) => {
  return image ? (
    <Avatar.Image size={size} source={{uri: image}} />
  ) : (
    <Avatar.Text size={size} label={avatarText(name)} />
  );
};

export default User;
