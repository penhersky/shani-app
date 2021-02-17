import React from 'react';
import _ from 'lodash';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {List} from 'react-native-paper';

import {Category} from '../../../redux/types/categories';

import {useTheme, WhiteOrDark} from '../../theme';

const Component = ({
  onChange,
  category,
  hiddenChildren,
}: {
  onChange: (category: Category) => void;
  category: Category;
  hiddenChildren?: boolean;
}) => {
  const theme = useTheme();
  const style = useStyle(theme);
  const {categories} = useSelector((state: any) => state.categories);

  const children = _.filter(
    categories,
    (item: Category) => item.parent === category.id,
  );

  if (children.length === 0 || hiddenChildren) {
    return (
      <List.Item title={category.name} onPress={() => onChange(category)} />
    );
  }

  return (
    <List.Accordion title={category.name}>
      {_.map(children, (item: Category) => (
        <List.Item
          title={item.name}
          key={item.id}
          style={style.listItem}
          onPress={() => onChange(item)}
        />
      ))}
    </List.Accordion>
  );
};

const useStyle = (theme: WhiteOrDark) =>
  StyleSheet.create({
    listItem: {
      marginLeft: 5,
    },
  });

export default Component;
