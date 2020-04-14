import React, { Component } from "react";
import {View, Alert, FlatList, TouchableOpacity, Modal} from "react-native";
import { Button, Text } from '../registerComponents';
import { CreditCardInput } from "react-native-credit-card-input";
import { saveUserCard, getCards } from "../Requests/profileRequest";
import makePayment from "../Requests/makePayment";
import { Card } from 'react-native-elements';
import { Input } from '../registerComponents';
import { FontAwesome } from '@expo/vector-icons';
var stripe = require('stripe-client')('pk_test_Umwwh7JNL9kbihbfvhK0lykW00XnLlHQDX');

export default class CreditCardCharge extends Component {

  state = {
    number: '',
    exp_month: '',
    exp_year: '',
    cvc: '',
    cards: [],
    openCVCModal: false,
  }

  componentDidMount() {
    const creatorOfCard = global.userId;

    getCards(creatorOfCard).then(res => {
      this.setState({ cards: res.cards });
    })
  }

  onChange = (form) => { 
    this.setState({ 
        number: form.values.number.replace(/\s+/g, ''), 
        exp_month: parseInt(form.values.expiry.substring(0, 2)), 
        exp_year: parseInt(form.values.expiry.substring(3,5)), 
        cvc: form.values.cvc,
    });
  }

  cardSelected = (cardNumber, expMonth, expYear) => {
    this.setState({
      number: cardNumber,
      exp_month: expMonth,
      exp_year: expYear,
      openCVCModal: true
    });
  }

  onSubmit = async() => {

    this.setState({ openCVCModal: false })

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
          'Do you want to save this card for future use ?',
          [
            {
              text: 'NO',
              onPress: () => this.props.navigation.navigate('home'),
              style: 'cancel',
            },
            {text: 'YES', onPress: () => this.acceptPressed()},
          ],
          {cancelable: false},
        );
      }   
    })
  }

  acceptPressed = () => {
    const {number, exp_month, exp_year} = this.state;
    const creatorOfCard = global.userId;

    saveUserCard(number, exp_month, exp_year, creatorOfCard).then(res => {
      Alert.alert(
        'Card Saved Succesfully',
        'Do you want to return Home screen ?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => this.props.navigation.navigate('home')},
        ],
        {cancelable: false},
      );
    })
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

        <FlatList 
          data={this.state.cards}
          keyExtractor={item => item.expMonth.toString()}
          renderItem={({ item }) =>
          <TouchableOpacity onPress={() => this.cardSelected(item.cardNumber, item.expMonth, item.expYear)}>
            <Card
              title={item.cardNumber.replace(/(\d{4}(?!\s))/g, "$1 ") + "\n" + "\n" + item.expMonth + "/" + item.expYear}>
            </Card>
          </TouchableOpacity>
        }
        />

      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.openCVCModal}
        onRequestClose={() => this.setState({ openCVCModal: false})}
      >
        <View style={{ top: 120, alignItems: 'center' }}>
          <Card
            title={this.state.number.replace(/(\d{4}(?!\s))/g, "$1 ") + "\n" + "\n" + this.state.exp_month + "/" + this.state.exp_year}>
          </Card>
          <Text style={{ fontSize: 17, color: 'black', top: 5 }}>Please enter CVC code of Card showed above</Text>
          <Input
            full
            secureTextEntry
            keyboardType='phone-pad'
            label="CVC"
            style={{color: 'black' }}
            value={this.state.cvc}
            onChangeText={(text) => this.setState({ cvc: text })}
          />
          <View style={{ flexDirection: 'row'}}>
            <TouchableOpacity style={[styles.payBtn, {backgroundColor: 'green'}]} onPress={() => this.onSubmit()}>
              <Text>
                Submit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.payBtn} onPress={() => this.setState({ openCVCModal: false })}>
              <Text>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </View>
    );
  }
}

const styles = {
  payBtn: {
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12 * 1.2,
    backgroundColor: '#D83C54',
  },
};