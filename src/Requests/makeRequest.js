import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';

const makeRequest = (latitudeFrom, longitudeFrom, creator, price, paymentType, problem, serviceType, scheduled, address) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.89:8080/requests/makeRequest',
    data: {
        latitudeFrom: latitudeFrom,
        longitudeFrom: longitudeFrom,
        creator: creator,
        acceptor: creator,
        price: price,
        paymentType: paymentType,
        problem: problem,
        serviceType: serviceType,
        scheduled: scheduled,
        address: address
    }
    })
    .then(response => {
        return response.data;
    }, error => {
        console.log(error);
    });
}

export default makeRequest;