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
import {useMutation} from '@apollo/client';
import Skeleton from 'react-native-skeleton-placeholder';

import {useTranslation, global, user} from '../../translate';

import {useTheme, WhiteOrDark} from '../../theme';

import {authClient} from '../../clients';
import {updateDescription} from '../../schemas';

const Description = ({
  description,
  allowed,
  newDescription,
  loaded,
}: {
  description: string;
  allowed: boolean;
  newDescription: (text: string) => void;
  loaded: boolean;
}) => {
  const [open, setOpen] = React.useState(false);
  const [more, setMore] = React.useState(false);
  const [text, setText] = React.useState(description);
  const {tr} = useTranslation();
  const theme = useTheme();
  const style = useStyle(theme);
  const [response, {data, loading, error}] = useMutation(updateDescription, {
    client: authClient,
  });

  const onPressShow = () => {
    setMore(!more);
  };
  const onPressEdit = () => {
    setOpen(true);
  };
  const onPressSave = () => {
    response({variables: {description: text}});
    newDescription(text);
  };

  React.useEffect(() => {
    if (data) {
      if (data.updateDescription.result === 'SUCCESS') {
        setOpen(false);
      }
    }
  }, [data]);

  if (!loaded && !description) {
    return (
      <Skeleton>
        <Skeleton.Item width={Dimensions.get('window').width} height={210} />
      </Skeleton>
    );
  }

  if (!description) {
    return null;
  }

  return (
    <Card style={[style.des]}>
      <Card.Title title={tr(user, 'about')} />
      <Card.Content>
        <Text>{more ? description : `${description.slice(0, 360)}...`}</Text>
      </Card.Content>

      <Card.Actions style={style.action}>
        {description.length > 360 && (
          <Button onPress={onPressShow}>
            {tr(global, more ? 'less' : 'more')}
          </Button>
        )}

        {allowed && (
          <Button onPress={onPressEdit} icon="pencil">
            {tr(global, 'edit')}
          </Button>
        )}
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
                error={Boolean(error)}
                mode="outlined"
                multiline={true}
                style={style.input}
                onChangeText={setText}
              />
            </ScrollView>
          </Dialog.Content>

          <Button
            disabled={text === description || loading}
            onPress={onPressSave}
            loading={loading}
            icon="content-save">
            {tr(global, 'save')}
          </Button>
        </Dialog>
      </Portal>
    </Card>
  );
};

const useStyle = (theme: WhiteOrDark) =>
  StyleSheet.create({
    des: {
      marginVertical: 3,
      maxHeight: '100%',
      minHeight: 210,
    },
    action: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'stretch',
    },
    content: {
      height: Dimensions.get('window').height / 2.2,
    },
    input: {
      backgroundColor: theme.colors.surface,
    },
  });

export default Description;
