import React from 'react';
import { FormattedNumber } from 'react-intl';

const CurrencyFormat = ({ value }) => {
    const formattedValue = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(value);

    return <span>{formattedValue}</span>;
};

export default CurrencyFormat;