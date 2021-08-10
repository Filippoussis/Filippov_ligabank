import React from 'react';
import {render, screen} from '@testing-library/react';

import СonversionHistory from './conversion-history';

const fakeData = [
  {
    id: 1,
    date: '01.01.2021',
    amountCurrencySell: '100',
    currencySell: 'RUB',
    amountCurrencyBuy: '1',
    currencyBuy: 'USD',
  },
];

test('СonversionHistory', () => {
  render(<СonversionHistory historyData={fakeData} />);
  expect(screen.getByRole('heading', {level: 3})).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(screen.getByText('История конвертации')).toBeInTheDocument();
});
