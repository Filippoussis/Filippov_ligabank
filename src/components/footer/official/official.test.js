import React from 'react';
import {render, screen} from '@testing-library/react';

import Official from './official';

test('Official', () => {
  render(<Official />);
  expect(screen.getByText('ЛИГА Банк')).toBeInTheDocument();
  expect(screen.getByText('150015, г. Москва, ул. Московская, д. 32')).toBeInTheDocument();
  expect(screen.getByText('Генеральная лицензия Банка России №1050')).toBeInTheDocument();
});
