import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

import Footer from './footer';

let history;

describe('Component: Footer', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Footer />
      </Router>,
    );

    expect(screen.getAllByText(/Лига Банк/i).length).toBe(2);
  });
});
