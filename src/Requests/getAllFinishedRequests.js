import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';

const getAllFinishedRequests = (creator) => {
    return axios({
    method: 'post',
    url: 'http://localhost:8080/requests/getFinishedRequest',
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

export default getAllFinishedRequests;