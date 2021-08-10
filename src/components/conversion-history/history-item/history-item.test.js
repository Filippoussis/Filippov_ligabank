import React from 'react';
import {render, screen} from '@testing-library/react';

import HistoryItem from './history-item';

const fakeData = {
  id: 1,
  date: '01.01.2021',
  amountCurrencySell: '100',
  currencySell: 'RUB',
  amountCurrencyBuy: '1',
  currencyBuy: 'USD',
};

test('СonversionHistory', () => {
  render(<HistoryItem item={fakeData} />);
  expect(screen.getByText('01.01.2021')).toBeInTheDocument();
  expect(screen.getByText('RUB')).toBeInTheDocument();
  expect(screen.getByText('USD')).toBeInTheDocument();
});
