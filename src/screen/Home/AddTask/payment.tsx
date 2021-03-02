import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, TextInput, Subheading} from 'react-native-paper';

import {useTranslation, task} from '../../../translate';

import {Picker} from '../../../components';

const list = [
  {
    value: 'USD',
    label: 'United States dollar',
  },
  {
    value: 'EUR',
    label: 'European euro',
  },
  {
    value: 'UAH',
    label: 'Українська гривня',
  },
  {
    value: 'RUB',
    label: 'Российский рубль',
  },
];

const Payment = ({
  onChange,
  value,
  curr,
  onChangeCurr,
}: {
  onChange: (value: string) => void;
  value: string;
  curr: string;
  onChangeCurr: (value: string) => void;
}) => {
  const {tr} = useTranslation();

  const onChangeHandler = (val: string) => {
    if (/^\d+(?:[.,]\d+)*$/gm.test(val) || !val) {
      onChange(val);
    }
  };

  return (
    <Card>
      <Card.Title title={tr(task, 'price')} />
      <Card.Content style={style.container}>
        <TextInput
          value={value}
          label={tr(task, 'sum')}
          onChangeText={onChangeHandler}
          mode="outlined"
          style={style.input}
        />
        <Picker value={curr} onChange={onChangeCurr} list={list}>
          <Subheading style={style.value}>{curr}</Subheading>
        </Picker>
      </Card.Content>
    </Card>
  );
};

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
  },
  value: {
    paddingHorizontal: 10,
  },
});

export default Payment;
