import React from 'react';
import {render, screen} from '@testing-library/react';

import CurrencyConverter from './currency-converter';

test('СonversionHistory', () => {
  render(<CurrencyConverter />);
  expect(screen.getByRole('heading', {level: 2})).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(screen.getByText('Конвертер валют')).toBeInTheDocument();
  expect(screen.getByText('Сохранить результат')).toBeInTheDocument();
  expect(screen.getByLabelText('У меня есть')).toBeInTheDocument();
  expect(screen.getByLabelText('Хочу приобрести')).toBeInTheDocument();
  expect(screen.getByLabelText('Выберите дату')).toBeInTheDocument();
});
