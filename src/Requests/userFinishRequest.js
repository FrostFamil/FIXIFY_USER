import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';


const userFinishRequest = (requestIndex) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.89:8080/requests/userFinishRequest',
    data: {
        requestIndex: requestIndex
    }
    })
    .then(response => {
        return response.data;
    }, error => {
        console.log(error);
    });
}

export default userFinishRequest