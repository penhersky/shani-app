import {StyleSheet} from 'react-native';

import {getTheme} from '../../theme';

const style = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    transform: [{scale: 0.7}],
  },
  cards: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    margin: 1,
  },
  mid: {
    padding: 10,
  },
  card: {
    flex: 1,
    marginHorizontal: 5,
  },
  content: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  img: {
    transform: [{scale: 0.8}],
  },
  login: {
    padding: 10,
    borderRadius: getTheme.borderRadius,
    width: '100%',
  },
  text: {
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default style;
