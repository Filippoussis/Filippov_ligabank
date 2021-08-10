import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

import SiteMenuItem from './site-menu-item';

let history;

describe('Component: SiteMenuItem', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    render(
      <Router history={history}>
        <SiteMenuItem item={'Конвертер валют'} />
      </Router>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText('Конвертер валют')).toBeInTheDocument();
  });
});
