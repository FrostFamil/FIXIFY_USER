import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';

const getAllAcceptedRequests = (creator) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.89:8080/requests/getAcceptedRequest',
    data: {
        creator: creator
    }
    })
    .then(response => {
        return response.data;
    }, error => {
        console.log(error);
    });
}

export default getAllAcceptedRequests;