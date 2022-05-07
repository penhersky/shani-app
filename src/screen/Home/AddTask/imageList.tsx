import React from 'react';
import _ from 'lodash';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Text, IconButton, Card} from 'react-native-paper';

import Icon from 'react-native-vector-icons/AntDesign';

import {useTranslation, global} from '../../../translate';
import {useTheme, WhiteOrDark} from '../../../theme';

import {ImageView} from '../../../modules';
import {Picker} from '../../../components';

import {Image as TImage} from '../../../types/image';

const Images = ({
  images,
  addImage,
  deleteImage,
}: {
  images: TImage[];
  addImage: (from: string) => void;
  deleteImage: (index: number) => void;
}) => {
  const [image, setImg] = React.useState<any>(_.nth(images, 0));
  const [show, setShow] = React.useState(false);

  const theme = useTheme();
  const style = useStyle(theme);
  const {tr} = useTranslation();

  const onPressImageHandler = (index: number) => {
    setImg(index);
    setShow(true);
  };

  const onAddImageHandler = (value: string) => {
    addImage(value);
  };

  const list = [
    {
      label: tr(global, 'camera'),
      value: 'camera',
    },
    {
      label: tr(global, 'library'),
      value: 'library',
    },
  ];

  return (
    <>
      <Card>
        <Card.Content style={style.imageArea}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={style.list}
            style={style.scroll}>
            <Picker
              list={list}
              onChange={onAddImageHandler}
              styles={style.inputImage}>
              <Icon name="plus" size={30} color={theme.colors.primary} />
              <Text style={style.primaryText}>
                {tr(global, 'add')} {tr(global, 'image').toLowerCase()}
              </Text>
            </Picker>

            {_.map(images, (img: TImage, index: number) => (
              <View key={index} style={style.imgContainer}>
                <TouchableOpacity onPress={() => onPressImageHandler(index)}>
                  <Image
                    style={style.image}
                    source={{
                      uri: img.Location,
                    }}
                  />
                </TouchableOpacity>
                <IconButton
                  icon="close-circle"
                  color={theme.colors.accent}
                  style={style.del}
                  size={30}
                  onPress={() => deleteImage(index)}
                />
              </View>
            ))}
          </ScrollView>
        </Card.Content>
        <ImageView
          images={images}
          show={show}
          value={image}
          onHidden={() => setShow(false)}
        />
      </Card>
    </>
  );
};

const useStyle = (theme: WhiteOrDark) =>
  StyleSheet.create({
    imageArea: {
      height: 120,
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    inputImage: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      minWidth: 100,
      height: 90,
      borderColor: theme.colors.primary,
      borderWidth: 1,
      borderRadius: theme.borderRadius,
    },
    scroll: {
      height: 90,
    },
    list: {
      height: 100,
      display: 'flex',
      justifyContent: 'center',
    },
    primaryText: {
      textTransform: 'uppercase',
      marginVertical: 5,
      color: theme.colors.primary,
    },
    imgContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 90,
    },
    image: {
      height: 90,
      width: 90,
      borderWidth: 1,
      marginHorizontal: 3,
      borderRadius: theme.borderRadius + 5,
    },
    del: {
      position: 'absolute',
      top: -16,
      right: -16,
    },
  });

export default Images;
