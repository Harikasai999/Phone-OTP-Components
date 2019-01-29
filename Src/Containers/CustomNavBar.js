/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';


type Props = {};
export default class CustomNavBar extends Component<Props> {

  render() {
    return (    
        <View style={styles.container}>
          <View style={styles.subContainer}>
            
          </View> 
          <View style={styles.middleContainer}>
              <Text style={styles.headerText}>{this.props.title}</Text>
          </View> 
          <View style={styles.subContainer}>
              
          </View> 
        </View>     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row'
  },
  subContainer: {
    flex: 0.2,
  },
 middleContainer:{
  flex: 0.6,
  justifyContent:'center',
  alignItems:'center'

 },
 headerText:{
  color:'white',
  fontSize:18,
  fontWeight:'600'
 }
});
