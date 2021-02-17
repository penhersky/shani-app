import React from 'react';
import _ from 'lodash';
import {useSelector} from 'react-redux';
import {ScrollView, StyleSheet} from 'react-native';
import {
  Subheading,
  Dialog,
  Portal,
  List,
  TouchableRipple,
  Card,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

import {Category} from '../../../redux/types/categories';

import {useTheme, WhiteOrDark} from '../../theme';

const Picker = ({
  onChange,
  value,
}: {
  value: Category[];
  onChange: (categories: Category[]) => void;
}) => {
  const theme = useTheme();
  const style = useStyle(theme);
  const {mainCategories} = useSelector((state: any) => state.categories);
  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);
  const showDialog = () => setVisible(true);

  const onChangeHandler = (category: any, index: number) => {
    console.log(category, index);
    onChange((value[index] = category));
  };

  return (
    <>
      <Card>
        <Card.Content style={style.container}>
          <TouchableRipple style={style.item}>
            <Icon name="plus" size={20} color={theme.colors.primary} />
          </TouchableRipple>
        </Card.Content>
      </Card>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <ScrollView>
              <List.Section>
                {_.map(mainCategories, (category: Category) => (
                  <Subheading key={category.id}>{category.name}</Subheading>
                ))}
              </List.Section>
            </ScrollView>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
};

const useStyle = (theme: WhiteOrDark) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
    },
    item: {
      height: 40,
      borderWidth: 1,
      borderRadius: theme.borderRadius,
      borderColor: theme.colors.accent,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default Picker;
