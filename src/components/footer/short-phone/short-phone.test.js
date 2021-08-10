import React from 'react';
import {render, screen} from '@testing-library/react';

import ShortPhone from './short-phone';

test('ShortPhone', () => {
  render(<ShortPhone />);
  expect(screen.getByText('*0904')).toBeInTheDocument();
  expect(screen.getByText('Бесплатно для абонентов МТС, Билайн, Мегафон, Теле2')).toBeInTheDocument();
});
