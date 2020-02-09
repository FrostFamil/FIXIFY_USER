import React, { Component } from "react";
import {View,Text, StyleSheet, Dimensions, Image, TextInput, Modal} from "react-native";
import {Header, Left, Icon, Body, Title, Right} from 'native-base';
import {CardSection} from '../components';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import makeRequest from '../Requests/makeRequest';

const { width, height } = Dimensions.get('screen');

export default class Auto extends Component {

  constructor(props) {
    super(props);

    this.state = {
      serviceType: 'Auto',
      problem: '',
      userLocation: "",
      creator: global.userId,
      price: 10
    }
  }

  makeOrder = () => {
    const { userLocation, creator, price, problem, serviceType } = this.state; 
    const latitudeFrom = userLocation.latitude;
    const longitudeFrom = userLocation.longitude;
    
    makeRequest(latitudeFrom, longitudeFrom, creator, price, problem, serviceType).then(res => {
      if(res){
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
        <View style={{backgroundColor: "#ff9600", width: width, height: width * 0.27, alignItems: 'center'}}>
            <Image style={styles.serviceImage} imageStyle={styles.serviceImage} source={require('../../assets/Icons/car.png')}/>
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