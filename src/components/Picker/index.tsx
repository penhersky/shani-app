import React from 'react';
import _ from 'lodash';
import {TouchableOpacity} from 'react-native';
import {Subheading, Dialog, Portal, List} from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';

import style from './style';

const Picker = ({
  styles = {},
  icon,
  value,
  list,
  onChange,
}: {
  styles?: any;
  icon?: string;
  value: string;
  list: {label: string; value: string}[];
  onChange: (value: string) => void;
}) => {
  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);
  const showDialog = () => setVisible(true);

  return (
    <>
      <TouchableOpacity style={[style.trigger, styles]} onPress={showDialog}>
        <>
          {icon ? <Icon name={icon} style={style.icon} size={25} /> : null}
          <Subheading style={style.title}>
            {_.find(list, {value})?.label}
          </Subheading>
        </>
      </TouchableOpacity>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <List.Section>
              {_.map(list, (item) => (
                <List.Item
                  title={item.label}
                  key={item.value}
                  onPress={() => {
                    onChange(item.value);
                    hideDialog();
                  }}
                />
              ))}
            </List.Section>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
};

export default Picker;
