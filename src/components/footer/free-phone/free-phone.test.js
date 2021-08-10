import React from 'react';
import {render, screen} from '@testing-library/react';

import FreePhone from './free-phone';

test('FreePhone', () => {
  render(<FreePhone />);
  expect(screen.getByRole('link')).toBeInTheDocument();
  expect(screen.getByText('8 800 111 22 33')).toBeInTheDocument();
  expect(screen.getByText('Бесплатный для всех городов России')).toBeInTheDocument();
});
