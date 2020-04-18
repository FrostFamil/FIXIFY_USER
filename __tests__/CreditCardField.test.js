import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import CreditCardCharge from '../src/screens/CreditCardCharge';

describe('Home screen field test', () => {

    //Unit test for CreditCardCharge screen
    describe('change text of CreditCardCharge screen', () => {
        it('change text of card cvc', () => {
        const {getByTestId} = render(<CreditCardCharge />);

        // use fireEvent change value TextInput
        fireEvent.changeText(getByTestId('cvc'), '123');

        // use toEqual check value TextInput
        expect(getByTestId('cvc').props.value).toEqual('123');
        });
    });
});