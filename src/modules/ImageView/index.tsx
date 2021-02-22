import React from 'react';
import _ from 'lodash';
import {StyleSheet, Dimensions, Image, ScrollView, View} from 'react-native';
import {Modal, Portal, IconButton, Button} from 'react-native-paper';

import {Image as TypeImage} from '../../types/image';

import {useTheme, WhiteOrDark} from '../../theme';
import {useTranslation, global} from '../../translate';

const ImageView = ({
  images,
  value,
  onPress,
  show,
  onHidden,
  editable,
}: {
  images: TypeImage[];
  value: number;
  onPress?: (value: string) => void;
  show: boolean;
  onHidden: () => void;
  editable?: boolean;
}) => {
  const [active, setActive] = React.useState(0);
  const {tr} = useTranslation();
  const theme = useTheme();
  const style = useStyle(theme);

  const {width} = Dimensions.get('window');
  const height = (width * 100) / 70;

  const onScrollHandler = ({nativeEvent}: any) => {
    const slide =
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width;

    if (slide !== active) {
      setActive(slide);
    }
  };

  const progress = width / (images?.length as number);

  return (
    <Portal>
      <Modal
        visible={show}
        onDismiss={onHidden}
        contentContainerStyle={style.container}>
        <IconButton
          icon="close"
          color={theme.colors.accent}
          onPress={onHidden}
          style={style.close}
          size={30}
        />

        <ScrollView
          horizontal
          style={{width, height}}
          pagingEnabled
          onScroll={onScrollHandler}
          contentContainerStyle={style.list}>
          {_.map(images, (img: TypeImage) => (
            <Image
              source={{uri: img.Location}}
              key={img.id}
              style={[style.image, {height, width}]}
            />
          ))}
        </ScrollView>
        <View style={[{width}, style.progress]}>
          <View style={[style.line, {width: progress + progress * active}]} />
        </View>
        {editable && (
          <Button
            style={style.button}
            mode="outlined"
            onPress={() =>
              onPress && onPress(_.nth(images, active)?.id as string)
            }>
            {tr(global, 'save')}
          </Button>
        )}
      </Modal>
    </Portal>
  );
};

const useStyle = (theme: WhiteOrDark) =>
  StyleSheet.create({
    container: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      backgroundColor: '#00000085',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      padding: 5,
    },
    close: {
      position: 'absolute',
      top: 3,
      right: 7,
      zIndex: 100,
    },
    image: {
      resizeMode: 'contain',
    },
    list: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    progress: {
      height: 3,
      position: 'absolute',
      top: 0,
      backgroundColor: theme.colors.background,
      opacity: 0.7,
    },
    line: {
      backgroundColor: theme.colors.text,
      height: '100%',
      borderRadius: theme.borderRadius,
    },
    button: {
      position: 'absolute',
      bottom: 25,
      alignSelf: 'center',
      borderColor: theme.colors.primary,
      width: Dimensions.get('window').width - 10,
    },
  });

export default ImageView;
