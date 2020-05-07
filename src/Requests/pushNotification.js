import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';

const pushNotification = (token, fName, lName, userId) => {
    return axios({
    method: 'post',
    url: 'http://localhost:8080/notification/saveUsersToken',
    data: {
        token: token,
        fName: fName,
        lName: lName,
        userId: userId
    }
    })
    .then(response => {
        return response.data;
    }, error => {
        console.log(error);
    });
}

export {pushNotification};