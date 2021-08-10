import React from 'react';
import {render, screen} from '@testing-library/react';

import WeekendMessage from './weekend-message';

test('WeekendMessage', () => {
  render(<WeekendMessage />);
  expect(screen.getByText('в выходные дни котировки предоставляются на пятницу'))
    .toBeInTheDocument();
});
