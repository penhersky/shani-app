import React from 'react';
import _ from 'lodash';
import {ScrollView} from 'react-native';
import {Card, TextInput, Divider, Button} from 'react-native-paper';

import {useTranslation, global, task} from '../../../translate';
import {useTheme} from '../../../theme';
import screens from '../../../lib/screens';

import {CategoryPiker} from '../../../modules';
import ImageArea from './imageList';
import Location from './location';
import MoreSettings from './MoreSettings';

import useStyle from './style';

// temp
const list = [
  {
    id: Math.random().toString(),
    Location:
      'https://images.wallpaperscraft.ru/image/ezhevika_malina_yagody_104785_240x320.jpg',
  },
  {
    id: Math.random().toString(),
    Location:
      'https://cdn.pixabay.com/photo/2020/06/01/13/02/mountains-5246545_960_720.jpg',
  },
  {
    id: Math.random().toString(),
    Location:
      'https://cdn.pixabay.com/photo/2020/06/15/15/16/the-caucasus-5302236__340.jpg',
  },
  {
    Location:
      'https://cdn.pixabay.com/photo/2020/06/15/15/16/the-caucasus-5302236__340.jpg',
  },
  {
    id: Math.random().toString(),
    Location:
      'https://cdn.pixabay.com/photo/2020/06/15/15/16/the-caucasus-5302236__340.jpg',
  },
];

const Add = ({navigation}: any) => {
  const theme = useTheme();
  const style = useStyle(theme);
  const {tr} = useTranslation();

  const [images, setImages] = React.useState<any[]>([]);
  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [locationType, setType] = React.useState<string>('other');
  const [location, setLocation] = React.useState<{
    lng?: number;
    lat?: string;
    name: string;
  }>({name: 'other'});
  const [categories, setCategories] = React.useState<any[]>(
    _.fill(Array(3), undefined),
  );
  const [err, setError] = React.useState<string>('');

  const addImage = () => {
    setImages((state: any) => [...state, list[state.length]]);
  };
  const deleteImage = (index: number) => {
    setImages((state) =>
      _.filter(state, (v: string, i: number) => i !== index),
    );
  };

  const onCreateHandler = () => {
    alert('crete....');
    navigation.navigate(screens.TABS.myTasks);
  };

  return (
    <ScrollView style={style.container}>
      <Card>
        <Card.Title
          title={tr(task, 'mainData')}
          subtitle={tr(global, 'reqFields')}
        />
        <Card.Content>
          <TextInput
            value={title}
            onChangeText={setTitle}
            label={tr(task, 'title')}
            error={err === 'title'}
            mode="outlined"
            style={style.input}
          />
          <TextInput
            value={description}
            error={err === 'description'}
            mode="outlined"
            style={[style.input]}
            label={tr(task, 'description')}
            multiline={true}
            onChangeText={setDescription}
          />
          <Location
            type={locationType}
            setType={setType}
            onChangeValue={(value: any) => setLocation(value)}
          />
        </Card.Content>
      </Card>
      <Divider />
      <CategoryPiker
        value={categories}
        onChange={setCategories}
        title={tr(task, 'categoriesTitle')}
        description={tr(task, 'categoriesDescription')}
      />
      <Divider />
      <ImageArea
        addImage={addImage}
        deleteImage={deleteImage}
        images={images}
      />
      <Button onPress={onCreateHandler} style={style.button} mode="contained">
        {tr(global, 'create')}
      </Button>
      <MoreSettings />
    </ScrollView>
  );
};

export default Add;
