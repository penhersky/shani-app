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
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  const [index, setIndex] = React.useState(0);
  const {mainCategories} = useSelector((state: any) => state.categories);
  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  const onPressHandler = (i: number) => {
    setVisible(true);
    setIndex(i);
  };

  const onPressCategoryHandler = (category: any) => {
    setVisible(false);
    onChange(
      _.map(value, (item, i) => (_.isEqual(i, index) ? category : item)),
    );
  };

  return (
    <>
      <Card>
        <Card.Content style={style.container}>
          {_.map(value, (item: Category, i: number) => (
            <TouchableRipple
              key={i}
              style={[
                style.item,
                // eslint-disable-next-line react-native/no-inline-styles
                {justifyContent: item ? 'space-between' : 'center'},
              ]}
              onPress={() => onPressHandler(i)}>
              {item ? (
                <>
                  <Subheading>{_.get(item, 'name')}</Subheading>
                  <Ionicons
                    name="repeat"
                    size={25}
                    color={theme.colors.primary}
                  />
                </>
              ) : (
                <Icon name="plus" size={20} color={theme.colors.primary} />
              )}
            </TouchableRipple>
          ))}
        </Card.Content>
      </Card>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <ScrollView>
              <List.Section>
                {_.map(mainCategories, (category: Category) => (
                  <TouchableRipple
                    key={category.id}
                    onPress={() => onPressCategoryHandler(category)}>
                    <Subheading>{category.name}</Subheading>
                  </TouchableRipple>
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
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      marginVertical: 1,
    },
  });

export default Picker;
