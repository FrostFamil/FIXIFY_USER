import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';

const makeRequest = (latitudeFrom, longitudeFrom, creator, price, problem, serviceType) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.87:8080/requests/makeRequest',
    data: {
        latitudeFrom: latitudeFrom,
        longitudeFrom: longitudeFrom,
        creator: creator,
        acceptor: creator,
        price: price,
        problem: problem,
        serviceType: serviceType
    }
    })
    .then(response => {
        return response.data;
    }, error => {
        console.log(error);
    });
}

export default makeRequest;