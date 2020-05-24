import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';

const makePayment = (fName, email, amount, token) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.89:8080/payment/chargeCreditCard',
    data: {
        fName: fName,
        email: email,
        amount: amount,
        token: token
    }
    })
    .then(response => {
        return response;
    }, error => {
        console.log(error);
    });
}

export default makePayment;