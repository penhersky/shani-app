import React from 'react';
import _ from 'lodash';
import {View, StyleSheet} from 'react-native';
import {Card, List, Button} from 'react-native-paper';

import {useTranslation, global} from '../../../translate';
import {useTheme} from '../../../theme';

import {WhiteOrDark} from './../../../theme';

const Images = ({}: {}) => {
  const theme = useTheme();
  const style = useStyle(theme);
  const {tr} = useTranslation();

  return (
    <Card>
      <Card.Content>
        <List.Accordion title={tr(global, 'moreSettings')}>
          <Button>helo</Button>
          <Button>helo</Button>
          <Button>helo</Button>
          <Button>helo</Button>
        </List.Accordion>
      </Card.Content>
    </Card>
  );
};

const useStyle = (theme: WhiteOrDark) => StyleSheet.create({});

export default Images;
