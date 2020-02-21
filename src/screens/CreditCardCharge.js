import React, { Component } from "react";
import {View, Alert} from "react-native";
import { Button, Text } from '../registerComponents';
import { CreditCardInput } from "react-native-credit-card-input";
import makePayment from "../Requests/makePayment";
var stripe = require('stripe-client')('pk_test_Umwwh7JNL9kbihbfvhK0lykW00XnLlHQDX');

export default class CreditCardCharge extends Component {

  state = {
    number: '',
    exp_month: '',
    exp_year: '',
    cvc: ''
  }

  onChange = (form) => { 
    this.setState({ 
        number: form.values.number.replace(/\s+/g, ''), 
        exp_month: parseInt(form.values.expiry.substring(0, 2)), 
        exp_year: parseInt(form.values.expiry.substring(3,5)), 
        cvc: form.values.cvc,
    });
  }

  onSubmit = async() => {

    var card = await stripe.createToken({
      card: {
        "number": this.state.number,
        "exp_month": this.state.exp_month,
        "exp_year": this.state.exp_year,
        "cvc": this.state.cvc
      }
    });

    var token = card.id;
    var amount = parseFloat(global.price);

    makePayment(global.fName, global.email, amount, token).then((res) => {
      if(res){
        Alert.alert(
          'Payment was successfull',
          'Do you want to return Home menu ?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => this.acceptPressed()},
          ],
          {cancelable: false},
        );
      }   
    })
  }

  acceptPressed = () => {
    this.props.navigation.navigate('home');
  }

  render() {
    return (
      <View style={{ top: 60 }}>
        <CreditCardInput onChange={this.onChange} />

        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
        <Button
            full
            style={{ marginTop: 15, backgroundColor: '#921721' }}
            onPress={() => this.onSubmit()}
        >
            <Text button>Submit</Text>
        </Button>
        </View>
      </View>
    );
  }
}