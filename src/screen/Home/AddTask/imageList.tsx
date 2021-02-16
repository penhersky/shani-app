import React from 'react';
import _ from 'lodash';
import {ScrollView, View, Image, StyleSheet} from 'react-native';
import {Text, TouchableRipple, IconButton, Card} from 'react-native-paper';

import Icon from 'react-native-vector-icons/AntDesign';

import {useTranslation, global} from '../../../translate';
import {useTheme} from '../../../theme';

import {WhiteOrDark} from './../../../theme';

const Images = ({
  images,
  addImage,
  deleteImage,
}: {
  images: string[];
  addImage: () => void;
  deleteImage: (index: number) => void;
}) => {
  const theme = useTheme();
  const style = useStyle(theme);
  const {tr} = useTranslation();

  return (
    <Card>
      <Card.Content style={style.imageArea}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={style.list}
          style={style.scroll}>
          <TouchableRipple onPress={addImage} style={{...style.inputImage}}>
            <>
              <Icon name="plus" size={30} color={theme.colors.primary} />
              <Text style={style.primaryText}>
                {tr(global, 'add')} {tr(global, 'image').toLowerCase()}
              </Text>
            </>
          </TouchableRipple>
          {_.map(images, (img: string, index: number) => (
            <View key={index} style={style.imgContainer}>
              <Image
                style={style.image}
                source={{
                  uri: img,
                }}
              />
              <IconButton
                icon="close-circle"
                color={theme.colors.surface}
                style={style.del}
                size={30}
                onPress={() => deleteImage(index)}
              />
            </View>
          ))}
        </ScrollView>
      </Card.Content>
    </Card>
  );
};

const useStyle = (theme: WhiteOrDark) =>
  StyleSheet.create({
    imageArea: {
      height: 100,
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
