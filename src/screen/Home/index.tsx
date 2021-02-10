import React from 'react';
import {} from 'react-native';
import {Text} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Feather';

import {SET_AUTH} from '../../../redux/types/user';

import More from './More';
import MyOrders from './MyOrders';

const Tab = createBottomTabNavigator();

const Home = () => {
  const dispatch = useDispatch();
  const {type} = useSelector((state: any) => state.user);

  if (type === 'customer') {
    return (
      <Tab.Navigator initialRouteName="MyOrders">
        <Tab.Screen
          name="MyOrders"
          component={MyOrders}
          options={{
            tabBarIcon: ({size, color}) => (
              <Icon name="solution1" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="More"
          component={More}
          options={{
            tabBarIcon: ({size, color}) => (
              <Fontisto name="more-horizontal" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  if (type === 'performer') {
    return <Text>Performer Home</Text>;
  }

  dispatch({type: SET_AUTH, isAuthorized: false});
};

export default Home;
