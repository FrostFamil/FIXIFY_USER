import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';

const profileRequest = (userId) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.87:8080/auth/profile',
    data: {
        userId: userId
    }
    })
    .then(response => {
        return response.data.user;
    }, error => {
        console.log(error);
    });
}

export default profileRequest;