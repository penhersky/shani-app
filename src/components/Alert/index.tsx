import React from 'react';
import {StyleSheet} from 'react-native';
import {Title, Dialog, Portal, Button, Subheading} from 'react-native-paper';

import {AntDesign, size} from '../../lib/icon';
import {useTheme} from '../../theme';
import {useTranslation, global} from '../../translate';

const Alert = ({
  visible,
  setVisible,
  onCancel,
  onOk,
  Icon,
  title,
  subTitle,
}: {
  visible: boolean;
  setVisible: (value: boolean) => void;
  onOk?: () => void;
  onCancel?: () => void;
  Icon?: (props: {color: string; size: number; style: any}) => JSX.Element;
  subTitle?: string;
  title?: string;
}) => {
  const theme = useTheme();
  const {tr} = useTranslation();
  const hideDialog = () => setVisible(false);
  return (
    <>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content style={style.content}>
            {Icon ? (
              <Icon
                color={theme.colors.primary}
                size={size.large}
                style={style.icon}
              />
            ) : (
              <AntDesign
                name="infocirlceo"
                size={size.large}
                color={theme.colors.primary}
                style={style.icon}
              />
            )}
            {title && <Title style={style.text}>{title}</Title>}
            <Subheading style={style.text}>{subTitle}</Subheading>
          </Dialog.Content>
          <Dialog.Actions>
            {onCancel && (
              <Button
                style={style.action}
                onPress={() => {
                  onCancel();
                  setVisible(false);
                }}>
                {tr(global, 'cancel')}
              </Button>
            )}
            <Button
              style={style.action}
              onPress={() => {
                onOk && onOk();
                setVisible(false);
              }}>
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const style = StyleSheet.create({
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    margin: 10,
  },
  action: {
    margin: 5,
  },
  text: {
    textAlign: 'center',
  },
});

export default Alert;
