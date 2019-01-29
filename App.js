/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, SafeAreaView, StatusBar} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import AppNavigator from './Src/Containers/AppNavigator.js';

type Props = {};
 class App extends Component<Props> {
  render() {
    return (
      <SafeAreaView style={styles.safeAreaStyle}>
        <View style={styles.container}>
           <StatusBar
               backgroundColor="black"
               barStyle="light-content"
             />          
          <AppNavigator />          
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  safeAreaStyle:{
    flex: 1, 
    backgroundColor: 'black'
  },
});
export default App