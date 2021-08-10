import React from 'react';
import {render, screen} from '@testing-library/react';

import Logo from './logo';

test('Logo', () => {
  render(<Logo />);
  expect(screen.getByText('ЛИГА Банк'))
    .toBeInTheDocument();
});
