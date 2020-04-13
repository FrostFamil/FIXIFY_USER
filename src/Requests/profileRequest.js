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


const getFixerProfileRequest = (fixerId) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.87:8080/auth/fixerProfile',
    data: {
        fixerId: fixerId
    }
    })
    .then(response => {
        return response.data.fixer;
    }, error => {
        console.log(error);
    });
}

const saveUserCard = (number, exp_month, exp_year, creatorOfCard) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.87:8080/auth/addCard',
    data: {
        cardNumber: number,
        expMonth: exp_month,
        expYear: exp_year,
        creatorOfCard: creatorOfCard
    }
    })
    .then(response => {
        return response.data;
    }, error => {
        console.log(error);
    });
}

const getCards = (creatorOfCard) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.87:8080/auth/getCards',
    data: {
        creatorOfCard: creatorOfCard
    }
    })
    .then(response => {
        return response.data;
    }, error => {
        console.log(error);
    });
}

export {profileRequest, getFixerProfileRequest, saveUserCard, getCards};