import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

import Social from './social';

let history;

describe('Component: Social', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    const socialLinksCount = 4;

    render(
      <Router history={history}>
        <Social />
      </Router>,
    );

    expect(screen.getAllByRole('link').length).toBe(socialLinksCount);
  });
});
