import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, List, Checkbox} from 'react-native-paper';

import {useTranslation, global, task} from '../../../translate';
import {useTheme} from '../../../theme';

import {WhiteOrDark} from './../../../theme';

const Images = ({
  comment,
  visible,
  onChangeVisible,
  onChangeComments,
}: {
  comment: boolean;
  visible: boolean;
  onChangeVisible: (value: boolean) => void;
  onChangeComments: (value: boolean) => void;
}) => {
  const theme = useTheme();
  const style = useStyle(theme);
  const {tr} = useTranslation();

  return (
    <Card>
      <Card.Content>
        <List.Accordion title={tr(global, 'moreSettings')}>
          <Checkbox.Item
            label={tr(task, 'allowComments')}
            color={theme.colors.primary}
            status={comment ? 'checked' : 'unchecked'}
            onPress={() => onChangeComments(!comment)}
          />

          <Checkbox.Item
            label={tr(task, 'visible')}
            color={theme.colors.primary}
            status={visible ? 'checked' : 'unchecked'}
            onPress={() => onChangeVisible(!visible)}
          />
        </List.Accordion>
      </Card.Content>
    </Card>
  );
};

const useStyle = (theme: WhiteOrDark) => StyleSheet.create({});

export default Images;
