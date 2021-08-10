import React from 'react';
import {render, screen} from '@testing-library/react';

import ClearHistoryButton from './clear-history-button';

test('ClearHistoryButton', () => {
  render(<ClearHistoryButton />);
  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(screen.getByText('Очистить историю')).toBeInTheDocument();
});
