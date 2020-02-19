import React, { Component } from "react";
import {View,Text} from "react-native";
import {Header, Left, Icon, Body, Title, Right} from 'native-base';
import {Ionicons, FontAwesome} from '@expo/vector-icons';
import OrderList from '../mocks/OrderList';
import getAllPendingRequests from "../Requests/getAllPendingRequests";
import getAllAcceptedRequests from '../Requests/getAllAcceptedRequests';
import getAllFinishedRequests from '../Requests/getAllFinishedRequests';
import userGetsHisCurrentRequest from '../Requests/userGetsHisCurrentRequest';
import userSeeFixer from "../Requests/userSeeFixer";
import { getFixerProfileRequest } from '../Requests/profileRequest';

export default class Orders extends Component {

  static navigationOptions = ({navigation}) => {
    const {state} = navigation;

    return {
      drawerIcon: () => (
        <Ionicons name="ios-time" size={29} style={{ color: 'black' }} />
      ),
      drawerLabel: () => (
        <Text style={{ color: 'black', fontSize: 20 }}>Orders</Text>  
      ),
    }
  }

  state={
    pendingOrders: [],
    acceptedOrders: [],
    finishedOrders: [],
    orderIndex: '',
    creator: global.userId
  }

  componentDidMount() {
    const {creator} = this.state;

    getAllPendingRequests(creator).then(res => {
      this.setState({ pendingOrders: res.requests});     
    });

    getAllAcceptedRequests(creator).then(res => {
      this.setState({ acceptedOrders: res.requests});     
    });

    getAllFinishedRequests(creator).then(res => {
      this.setState({ finishedOrders: res.requests});     
    });
  }

  refreshPressed = () => {
    const {creator} = this.state;

    getAllPendingRequests(creator).then(res => {
      this.setState({ pendingOrders: res.requests});     
    });

    getAllAcceptedRequests(creator).then(res => {
      this.setState({ acceptedOrders: res.requests});  
    });

    getAllFinishedRequests(creator).then(res => {
      this.setState({ finishedOrders: res.requests});     
    });
  }

  openMapDetails = () => {
  const creator = global.userId;

  userGetsHisCurrentRequest(creator).then(res => {
    global.fixerId = res.requests.acceptor;
    global.problem = res.requests.problem;
    global.serviceType = res.requests.serviceType;
    global.latitudeFrom = res.requests.latitudeFrom;
    global.longitudeFrom = res.requests.longitudeFrom;
    global.schedule = res.requests.scheduled;
    global.payment = res.requests.paymentType;
  }).then(() => {
    userSeeFixer(global.fixerId).then(res => {
      global.latitudeFixer = res.fixer.latitude;
      global.longitudeFixer = res.fixer.longitude;
    }).then(() => {
      getFixerProfileRequest(global.fixerId).then(res => {
        global.fixerFirstName = res.firstName;
        global.fixerLastName = res.lastName; 
        global.fixerEmail = res.email;
      }).then(() => {
        this.props.navigation.navigate("orderMap")
      })
    })
  })
  }

  render() {
    return (
      <View>
        <Header style={{ backgroundColor: "#97387a"}}>
          <Left style={{ left: 5}}>
            <Icon  name='menu' onPress={() => this.props.navigation.openDrawer()} style={{ color: 'white'}} />
          </Left>
          <Body style={{ flex: 1}}>
            <Title style={{ color: 'white'}}>Orders</Title>
          </Body>
          <Right style={{ right: 5}}>
            <FontAwesome onPress={() => this.refreshPressed()} name='refresh' style={{ color: 'white', fontSize: 25}} />
          </Right>
        </Header>
        
        <OrderList pendingOrders={this.state.pendingOrders} acceptedOrders={this.state.acceptedOrders} finishedOrders={this.state.finishedOrders} details={() => this.openMapDetails()} />
      </View>
    );
  }
}