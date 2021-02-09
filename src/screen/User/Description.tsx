import React from 'react';
import {StyleSheet, ScrollView, Dimensions} from 'react-native';
import {
  Card,
  Text,
  Button,
  Dialog,
  Portal,
  IconButton,
  TextInput,
} from 'react-native-paper';

import {useTranslation, global} from '../../translate';

const Description = ({
  description,
  allowed,
}: {
  description: string;
  allowed: boolean;
}) => {
  const [open, setOpen] = React.useState(false);
  const [more, setMore] = React.useState(false);
  const [text, setText] = React.useState(description);
  const {tr} = useTranslation();
  const onPressShow = () => {
    setMore(!more);
  };
  const onPressEdit = () => {
    setOpen(true);
  };
  const onPressSave = () => {
    setOpen(false);
  };

  console.log(text === description);

  return (
    <Card style={style.des}>
      <Card.Content>
        <Text>
          {more ? description : description.slice(0, 250)}
          {description.length > 250 && '...'}
        </Text>
      </Card.Content>

      <Card.Actions style={style.action}>
        <Button onPress={onPressShow}>
          {tr(global, more ? 'less' : 'more')}
        </Button>
        <Button onPress={onPressEdit} icon="pencil">
          {tr(global, 'edit')}
        </Button>
      </Card.Actions>

      <Portal>
        <Dialog visible={open} onDismiss={() => setOpen(false)}>
          <Dialog.Actions>
            <IconButton icon="close" onPress={() => setOpen(false)} />
          </Dialog.Actions>
          <Dialog.Content>
            <ScrollView style={style.content}>
              <TextInput
                value={text}
                mode="outlined"
                multiline={true}
                onChangeText={setText}
              />
            </ScrollView>
          </Dialog.Content>

          <Button
            disabled={text === description}
            onPress={onPressSave}
            icon="content-save">
            {tr(global, 'save')}
          </Button>
        </Dialog>
      </Portal>
    </Card>
  );
};

const style = StyleSheet.create({
  des: {
    marginVertical: 3,
  },
  action: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  content: {
    height: Dimensions.get('window').height - 200,
  },
});

export default Description;
