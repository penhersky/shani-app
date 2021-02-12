import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {SET_AUTH} from '../../../redux/types/user';

import {useTranslation, screenTitle} from '../../translate';

import More from './More';
import MyTasks from './MyTasks';
import AddTask from './AddTask';

import Recommendation from './Recommendation';
import Tasks from './Tasks';

const Tab = createBottomTabNavigator();

const Home = () => {
  const dispatch = useDispatch();
  const {tr} = useTranslation();
  const {type} = useSelector((state: any) => state.user);

  if (type === 'customer') {
    return (
      <Tab.Navigator initialRouteName="MyTasks">
        <Tab.Screen
          name="MyTasks"
          component={MyTasks}
          options={{
            title: tr(screenTitle, 'myTasks'),
            tabBarIcon: ({size, color}) => (
              <Icon name="solution1" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddTask}
          options={{
            title: '',
            tabBarIcon: ({size, color}) => (
              <MaterialIcons
                name="add-circle-outline"
                size={size + 12}
                style={style.add}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="More"
          component={More}
          options={{
            title: tr(screenTitle, 'More'),
            tabBarIcon: ({size, color}) => (
              <Fontisto name="more-horizontal" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  if (type === 'performer') {
    return (
      <Tab.Navigator initialRouteName="Tasks">
        <Tab.Screen
          name="Tasks"
          component={Tasks}
          options={{
            title: tr(screenTitle, 'tasks'),
            tabBarIcon: ({size, color}) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Recommendation"
          component={Recommendation}
          options={{
            title: tr(screenTitle, 'recommendation'),
            tabBarIcon: ({size, color}) => (
              <MaterialIcons name="star-border" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="MyTasks"
          component={MyTasks}
          options={{
            title: tr(screenTitle, 'myTasks'),
            tabBarIcon: ({size, color}) => (
              <Icon name="solution1" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="More"
          component={More}
          options={{
            title: tr(screenTitle, 'More'),
            tabBarIcon: ({size, color}) => (
              <Fontisto name="more-horizontal" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  dispatch({type: SET_AUTH, isAuthorized: false});
};

const style = StyleSheet.create({
  add: {
    marginTop: 15,
  },
});

export default Home;
