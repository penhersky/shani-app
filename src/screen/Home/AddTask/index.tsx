import React from 'react';
import _ from 'lodash';
import {ScrollView} from 'react-native';
import {} from 'react-native-paper';

import {useTranslation} from '../../../translate';
import {useTheme} from '../../../theme';

import ImageArea from './imageList';

import useStyle from './style';

// temp
const list = [
  'https://cdn.pixabay.com/photo/2020/06/15/15/16/the-caucasus-5302236__340.jpg',
  'https://cdn.pixabay.com/photo/2020/06/01/13/02/mountains-5246545_960_720.jpg',
  'https://cdn.pixabay.com/photo/2020/06/15/15/16/the-caucasus-5302236__340.jpg',
  'https://cdn.pixabay.com/photo/2020/06/01/13/02/mountains-5246545_960_720.jpg',
];

const Add = () => {
  const theme = useTheme();
  const style = useStyle(theme);
  const {tr} = useTranslation();

  const [images, setImages] = React.useState<string[]>([]);

  const addImage = () => {
    setImages((state) => [...state, list[state.length + 1]]);
  };
  const deleteImage = (index: number) => {
    setImages((state) =>
      _.filter(state, (v: string, i: number) => i !== index),
    );
  };

  return (
    <ScrollView style={style.container}>
      <ImageArea
        addImage={addImage}
        deleteImage={deleteImage}
        images={images}
      />
    </ScrollView>
  );
};

export default Add;