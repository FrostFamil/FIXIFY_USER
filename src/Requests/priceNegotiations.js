import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';

const userAcceptPrice = (requestId) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.87:8080/requests/userAcceptPriceForRequest',
    data: {
        requestId: requestId
    }
    })
    .then(response => {
        return response.data;
    }, error => {
        console.log(error);
    });
}

const userDeclinePrice = (requestId) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.87:8080/requests/userDeclinePriceForRequest',
    data: {
        requestId: requestId
    }
    })
    .then(response => {
        return response.data;
    }, error => {
        console.log(error);
    });
}

export {
    userAcceptPrice,
    userDeclinePrice
};