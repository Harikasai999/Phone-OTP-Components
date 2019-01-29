/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './Login.js';
import Otp from './Otp.js';
import RatingComponent from './RatingComponent.js';

const RootNavigator = createStackNavigator(
  {
    Login: { screen: Login },
    Otp: { screen: Otp },
    RatingComponent: { screen: RatingComponent },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',    
  },
);

const AppNavigator = createAppContainer(RootNavigator);
export default AppNavigator