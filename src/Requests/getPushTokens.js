import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';

const getPushTokens = (serviceType) => {
    return axios({
    method: 'post',
    url: 'http://localhost:8080/notification/getFixersToken',
    data: {
        serviceType: serviceType
    }
    })
    .then(response => {
        return response.data;
    }, error => {
        console.log(error);
    });
}

export default getPushTokens;