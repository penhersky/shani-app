import React from 'react';
import _ from 'lodash';
import {useSelector} from 'react-redux';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Subheading,
  Dialog,
  Portal,
  List,
  TouchableRipple,
  Card,
  Caption,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Category as CategoryType} from '../../../redux/types/categories';

import {useTheme, WhiteOrDark} from '../../theme';
import {Category} from '../../components';

const Picker = ({
  onChange,
  value,
  title,
  description,
}: {
  value: CategoryType[];
  onChange: (categories: CategoryType[]) => void;
  title: string;
  description?: string;
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
          <View style={style.title}>
            <Subheading>{title}</Subheading>
            <Caption>{description}</Caption>
          </View>
          {_.map(value, (item: CategoryType, i: number) => (
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
                {_.map(mainCategories, (category: CategoryType) => (
                  <Category
                    key={category.id}
                    category={category}
                    onChange={onPressCategoryHandler}
                  />
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
    title: {
      paddingBottom: 10,
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
