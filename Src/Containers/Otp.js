//This is an example code to make a Star Rating Bar //
import React, { Component } from 'react';
//import react in our code.
import {
  StyleSheet,
  View,
  Platform,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  AsyncStorage
} from 'react-native';
import { Button } from 'native-base';


export default class StarRating extends Component<{}> {
  constructor() {
    super();
    this.state = {
     firstInput:'', //first input value  
     secondInput:'', // second input value
     thirdInput:'', // third input value
     forthInput:'', // forth input value  
     format : /[!@#$%^&*()_+\-=\[\]{};‘:“\\|,.<>\/?]/, // in-valid format
     firstColor:'red',
     secondColor:'grey',
     thirdColor:'grey',
     forthColor:'grey'
    };
  }
  //To handle first input value 
  onChangeTextFirst = (text) => {    
    if(isNaN(text)){

    }else if(text.match(this.state.format)){
    
   }else{
      this.setState({
      firstInput:text
    },()=>{
       if(this.state.firstInput.length === 1){
      this.refs.second.focus()
      this.setState({
        secondColor:'red'
      })
    }else if(this.state.firstInput.length === 0){      
       this.setState({
        secondColor:'grey'
      })
    }
    })
    }    
  }
  //To handle second input value 
 onChangeTextSecond = (text) => {
  if(isNaN(text)){

    }else if(text.match(this.state.format)){
    
   }else{
    this.setState({
      secondInput:text
    },()=>{
       if(this.state.secondInput.length === 1){
      this.refs.third.focus()
      this.setState({
        thirdColor:'red'
      })
    }else if(this.state.secondInput.length === 0){
      this.refs.first.focus()
       this.setState({
        thirdColor:'grey'
      })
    }
    })
  }
  } 
  //To handle third input value 
  onChangeTextThird = (text) => {
    if(isNaN(text)){

    }else if(text.match(this.state.format)){
     
   }else{
    this.setState({
      thirdInput:text
    },()=>{
       if(this.state.thirdInput.length === 1){
      this.refs.forth.focus()
      this.setState({
        forthColor:'red'
      })
    }else if(this.state.thirdInput.length === 0){
      this.refs.second.focus()
       this.setState({
        forthColor:'grey'
      })
    }
    })
  }
  }  
  //To handle forth input value 
  onChangeTextForth = (text) => {
    if(isNaN(text)){

    }else if(text.match(this.state.format)){
    
   }else{
    this.setState({
      forthInput:text
    },()=>{
       if(this.state.forthInput.length === 1){
      Keyboard.dismiss()
    }else if(this.state.forthInput.length === 0){
      this.refs.third.focus()

    }
    })
  }
  }
  // When clicks on submit button
  async onSubmit(){
    const { firstInput, secondInput, thirdInput, forthInput } =this.state;
    console.log(firstInput+secondInput+thirdInput+forthInput)
      const user = await AsyncStorage.getItem('User');
      // alert(user)
    this.props.navigation.push('RatingComponent')

  }
  render() {
    const { firstInput, secondInput, thirdInput, forthInput , firstColor, secondColor, thirdColor, forthColor} =this.state
    return (
      <View style={styles.container}> 
      <View style={styles.headerView}> 
          <Text style={styles.headerText}>OTP</Text>
          </View>
      <View style={styles.inputContainerView}>     
         <View style={styles.inputMainView}>
         <View style={[styles.firstInputView,{borderColor:firstColor}]}>
                  <TextInput
                      ref="first"
                      style={styles.inputBorderView}                     
                      secureTextEntry
                      onChangeText={this.onChangeTextFirst.bind(this)}                    
                      keyboardType="numeric"
                      value={firstInput}
                      contextMenuHidden
                    />
                   
          </View> 
           <View style={[styles.inputView,{borderColor:secondColor}]}>
                    <TextInput
                      ref="second"
                      style={styles.inputBorderView}           
                      secureTextEntry
                      onChangeText={this.onChangeTextSecond.bind(this)}                    
                      keyboardType="numeric"
                      value={secondInput}
                      contextMenuHidden
                    />
                   
          </View>
           <View style={[styles.inputView,{borderColor:thirdColor}]}>
                  <TextInput
                      ref="third"
                      style={styles.inputBorderView}         
                      secureTextEntry
                      onChangeText={this.onChangeTextThird.bind(this)}                    
                      keyboardType="numeric"
                      value={thirdInput}
                      contextMenuHidden
                    />
                   
          </View> 
            <View style={[styles.inputView,{borderColor:forthColor}]}>
                  <TextInput
                      ref="forth"
                      style={styles.inputBorderView}               
                      secureTextEntry
                      onChangeText={this.onChangeTextForth.bind(this)}                    
                      keyboardType="numeric"
                      value={forthInput}
                      contextMenuHidden
                    />
                   
          </View> 
          </View>

          </View>
          <View style={styles.buttonView}>
          {firstInput !="" && secondInput != "" && thirdInput != "" && forthInput !=""?
          (<Button success style={styles.buttonStyle} onPress={this.onSubmit.bind(this)}>
              <Text style={styles.buttonText}>Submit</Text>
            </Button>)
            :(<Button disabled style={styles.disabledButtonStyle}>
              <Text style={styles.buttonText}>Submit</Text>
            </Button>)}
            
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputBorderView:{
    textAlign:'center',
  },
  inputView:{
    width:30, 
    height:Platform.OS ==='ios' ? 35 :'auto',
    marginLeft:15,
    borderBottomWidth:1,
  },
  firstInputView:{
    width:30, 
    height:Platform.OS ==='ios' ? 35: 'auto',
    borderBottomWidth:1,
  },
    headerView:{
    flex:0.3,
    alignItems:'center',
    justifyContent:'center',
  },
  inputMainView:{flex:1, flexDirection:'row',justifyContent:'center', alignItems:'center'},
  inputContainerView:{flex:0.4,  justifyContent:'center', alignItems:'center'},
  buttonView:{flex:0.3, justifyContent:'center'},
  buttonStyle:{backgroundColor:"black", alignSelf:'center', justifyContent:'center',alignItems:'center'},
  buttonText:{color:'white', fontSize:15, fontWeight:'500', paddingLeft:10, paddingRight:10},
  disabledButtonStyle:{alignSelf:'center', justifyContent:'center',alignItems:'center'},
  headerText:{
    fontSize:30,
    fontWeight:'600',
    color:'black'
  },
});
