import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {},
  userContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  user: {
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  toAcc: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 210,
  },
  icon: {
    marginHorizontal: 15,
  },
});
