import React, { Component } from "react";
import {View,Text, AsyncStorage} from "react-native";
import {Header, Left, Icon, Body, Title, Right} from 'native-base';
import ServiceList from '../mocks/ServiceList';
import * as Permissions from 'expo-permissions';
import {Notifications} from 'expo'
import {Entypo} from '@expo/vector-icons';
import {profileRequest} from '../Requests/profileRequest';
import {pushNotification} from '../Requests/pushNotification';
import {StackActions, NavigationActions} from 'react-navigation';

export default class Home extends Component {

  static navigationOptions = ({navigation}) => {
    const {state} = navigation;

    return {
      drawerIcon: () => (
        <Entypo name="tools" size={25} style={{ color: 'black' }} />
      ),
      drawerLabel: () => (
        <Text style={{ color: 'black', fontSize: 20 }}>Services</Text>  
      ),
    }
  }

  componentDidMount = async() => {
    profileRequest(global.userId).then(res => {
      global.fName = res.firstName;
      global.email = res.email;
      global.lName = res.lastName;  
    });

    let previousToken = await AsyncStorage.getItem('userPushToken');

    console.log(previousToken);

    if (previousToken){
      return;
    }else{
    let {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if ( status !== 'granted' ){
      return;
    }

    let token = await Notifications.getExpoPushTokenAsync();
    AsyncStorage.setItem('userPushToken', token);
    
    pushNotification(token, global.fName, global.lName, global.userId).then(res => {
      console.log(res);    
    })
  }
  }

  techBranchPressed = () => {
    this.props.navigation.navigate('technology');
  }

  plumberBranchPressed = () => {
    this.props.navigation.navigate('plumber');
  }

  electricBranchPressed = () => {
    this.props.navigation.navigate('electric');
  }

  furnitureBranchPressed = () => {
    this.props.navigation.navigate('furniture');
  }

  autoBranchPressed = () => {
    this.props.navigation.navigate('auto');
  }

  householdBranchPressed = () => {
    this.props.navigation.navigate('household');
  }

  logOutPressed = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'First' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View>
        <Header style={{ backgroundColor: "#97387a"}}>
          <Left style={{ left: 5}}>
            <Icon  name='menu' onPress={() => this.props.navigation.openDrawer()} style={{ color: 'white'}} />
          </Left>
          <Body style={{ flex: 1}}>
            <Title style={{ color: 'white'}}>Services</Title>
          </Body>
          <Right style={{ right: 5}}>
            <Entypo name="log-out" size={22} onPress={()=> this.logOutPressed()} style={{ color: 'white' }} />
          </Right>
        </Header>
        
        <ServiceList 
          techPressed={() => this.techBranchPressed()} 
          plumberPressed={() => this.plumberBranchPressed()}
          electricPressed={() => this.electricBranchPressed()}
          furniturePressed={() => this.furnitureBranchPressed()}
          autoPressed={() => this.autoBranchPressed()}
          householdPressed={() => this.householdBranchPressed()}
        />
      </View>
    );
  }
}