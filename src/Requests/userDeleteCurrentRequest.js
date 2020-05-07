import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';

const userDeleteCurrentRequest = (requestId) => {
    return axios({
    method: 'post',
    url: 'http://localhost:8080/requests/deleteCurrentRequest',
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

export default userDeleteCurrentRequest;