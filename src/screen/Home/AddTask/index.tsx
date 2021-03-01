import React from 'react';
import _ from 'lodash';
import {useMutation} from '@apollo/client';
import {ScrollView} from 'react-native';
import {Card, TextInput, Divider, Button} from 'react-native-paper';

import {useTranslation, global, task} from '../../../translate';
import {useTheme} from '../../../theme';
import screens from '../../../lib/screens';
import {photoFromCamera, photoFromLibrary} from '../../../lib/inputMedia';
import {task as schema} from '../../../schemas';

import {CategoryPiker} from '../../../modules';
import ImageArea from './imageList';
import Location from './location';
import MoreSettings from './MoreSettings';

import useStyle from './style';

const Add = ({navigation}: any) => {
  const theme = useTheme();
  const style = useStyle(theme);
  const {tr} = useTranslation();

  const [request, {loading, error, data}] = useMutation(schema.create);

  const [images, setImages] = React.useState<any[]>([]);
  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [locationType, setType] = React.useState<string>('other');
  const [location, setLocation] = React.useState<{
    lng?: string;
    lat?: string;
    name: string;
  }>({name: 'other'});
  const [categories, setCategories] = React.useState<any[]>(
    _.fill(Array(3), undefined),
  );
  const [err, setError] = React.useState<string>('');

  const addImage = (value: string) => {
    const add = ({uri, name, type}: any) => {
      setImages((state: any) => [
        ...state,
        {
          Location: uri,
          type,
          id: name,
        },
      ]);
    };
    if (value === 'camera') {
      return photoFromCamera(add);
    }
    photoFromLibrary(add);
  };
  const deleteImage = (index: number) => {
    setImages((state) =>
      _.filter(state, (v: string, i: number) => i !== index),
    );
  };

  const onCreateHandler = () => {
    if (title.length < 4) {
      setError('title');
      return;
    }
    if (description.length < 4) {
      setError('description');
      return;
    }
    request({
      variables: {
        order: {
          name: title,
          categories: _.map(_.compact(categories), (item) => item.id),
          location: location.name === 'other' ? undefined : location,
          description,
          payment: undefined,
          time: undefined,
          from: undefined,
          to: undefined,
          locationType: undefined,
          visible: true,
          allowComments: true,
        },
        images,
      },
    });
  };

  React.useEffect(() => {
    if (_.get(data, 'createOrder')) {
      if (_.get(data, 'createOrder').result === 'SUCCESS') {
        navigation.navigate(screens.TABS.myTasks, {
          task: _.get(data, 'createOrder').order,
        });
      }
    }
  }, [data, navigation]);

  console.log(error, data);

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
      <Button
        onPress={onCreateHandler}
        style={style.button}
        mode="contained"
        loading={loading}
        disabled={loading}>
        {tr(global, 'create')}
      </Button>
      <MoreSettings />
    </ScrollView>
  );
};

export default Add;
