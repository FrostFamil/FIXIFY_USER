import React, { Component } from "react";
import {View,Text, StyleSheet, Dimensions, Image, TextInput, TouchableOpacity} from "react-native";
import {Header, Left, Icon, Body, Title, Right} from 'native-base';
import {CardSection} from '../components';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import makeRequest from '../Requests/makeRequest';
import getPushTokens from '../Requests/getPushTokens';
import sendPushNotification from '../Requests/sendPushNotification';
import date from 'date-and-time';
import DateTimePicker from "react-native-modal-datetime-picker";
import ModalSelector from 'react-native-modal-selector';

const { width, height } = Dimensions.get('screen');

const paymentMethod = [{status: 'Cash'}, {status: 'Card'}];

export default class Furniture extends Component {

  constructor(props) {
    super(props);

    this.state = {
      serviceType: 'Furniture',
      problem: '',
      userLocation: "",
      creator: global.userId,
      price: 0,
      scheduled: 'Add Schedule for request',
      paymentType: 'Chose payment method',
      isDateTimePickerVisible: false
    }
  }

  makeOrder = () => {
    const { userLocation, creator, price, paymentType, problem, serviceType, scheduled } = this.state; 
    const latitudeFrom = userLocation.latitude;
    const longitudeFrom = userLocation.longitude;
    
    makeRequest(latitudeFrom, longitudeFrom, creator, price, paymentType, problem, serviceType, scheduled).then(res => {
      if(res){
        getPushTokens(serviceType).then(res => {

          var i;
          for (i = 0; i < res.tokens.length; i++) {
            var to = res.tokens[i].token;
            const title = "New Request";
            const body = "New Furniture Repairing Request";

            sendPushNotification(to, title, body).then(res => {
              console.log(res);       
            })
          }        
        })
        this.props.navigation.navigate("successOrder");
      } 
    })
  }

  getCoordsFromName(data) {
    this.setState({
      userLocation: {
        latitude: data.lat,
        longitude: data.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    });
  }

  notifyChange = (data) => {
    this.getCoordsFromName(data);
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = dateTime => {
    dateTime = date.format(dateTime, "YYYY-MM-DD HH:mm");
    this.setState({
      scheduled: dateTime
     })
    this.hideDateTimePicker();
  };

  render() {
    return (
      <View>
        <Header style={{ backgroundColor: "#97387a"}}>
          <Left style={{ left: 5}}>
            <Icon  name='ios-arrow-back' onPress={() => this.props.navigation.navigate('home')} style={{ color: 'white'}} />
          </Left>
          <Body style={{ flex: 1}}>
            <Title style={{ color: 'white'}}>Order</Title>
          </Body>
          
          <Right style={{ right: 5}}>
            <Icon  name='ios-checkmark' onPress={() => this.makeOrder()} style={{ color: 'white', fontSize: 42}} />
          </Right>
        </Header>
        <View style={{backgroundColor: "#e4473e", width: width, height: width * 0.27, alignItems: 'center'}}>
            <Image style={styles.serviceImage} imageStyle={styles.serviceImage} source={require('../../assets/Icons/furniture.png')}/>
        </View>

        <CardSection>
          <GooglePlacesAutocomplete
                placeholder="Enter your Location"
                minLength={2}
                autoFocus={false}
                returnKeyType={'search'}
                listViewDisplayed="false"
                fetchDetails={true}
                styles={{
                  textInputContainer: {
                    backgroundColor: 'white',
                    borderTopWidth: 0,
                    borderBottomWidth:0,
                    borderRadius: 9,
                    left: -17
                  },
                }}
                renderDescription={row => row.description}
                onPress={(data, details = null) => {
                    this.notifyChange(details.geometry.location);
                }
              }
              query={{
                  key: 'AIzaSyAjL_doMA-BBX1S-Lx_BJXrPAjQCFh3UrM',
                  language: 'en',
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={200}
              />
        </CardSection>

        <CardSection>
          <TextInput
            {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
            editable = {true}
            maxLength = {1000}
            style={{ fontSize: 18 }}
            multiline = {true}
            placeholder="Briefly Describe your problem"
            value={this.state.problem}
            onChangeText={problem => this.setState({ problem })}
           />
        </CardSection>

        <TouchableOpacity onPress={() => this.showDateTimePicker()}>
          <CardSection>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
              minimumDate={new Date()}
              mode={'datetime'}
            />
            <Text style={{ fontSize: 18 }} >{this.state.scheduled}</Text>
          </CardSection>
        </TouchableOpacity>

        <ModalSelector
            data={paymentMethod}
            initValue="Choose payment method"
            keyExtractor={key => key.status}
            labelExtractor= {item => item.status}
            accessible={true}
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel Button'}
            onChange={(option) => this.setState({ paymentType: option.status })}>
            <CardSection>
              <Text style={{ fontSize: 18 }} >{this.state.paymentType}</Text>
            </CardSection>
        </ModalSelector>
    
      </View>
    );
  }
}

const styles = StyleSheet.create({
    serviceImage: {
      width: width * 0.30,
      height: width * 0.25,
      borderRadius: 6,
      top: 3
    }
  });