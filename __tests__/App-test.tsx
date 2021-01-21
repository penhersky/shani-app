import 'react-native';
import React from 'react';
import Root from '../Root';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<Root />);
});
