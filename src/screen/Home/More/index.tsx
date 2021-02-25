import React from 'react';
import {} from 'react-native';
import {Text} from 'react-native-paper';

import {Rating} from '../../../components';

const More = () => {
  const [value, setValue] = React.useState(0);

  return (
    <Text>
      <Rating value={value} onPress={setValue} />
    </Text>
  );
};

export default More;
