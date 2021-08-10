import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

import SiteSections from './site-sections';

let history;

describe('Component: SiteSections', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    const linksCount = 4;

    render(
      <Router history={history}>
        <SiteSections />
      </Router>,
    );

    expect(screen.getAllByRole('link').length).toBe(linksCount);
    expect(screen.getByText('Услуги')).toBeInTheDocument();
    expect(screen.getByText('Рассчитать кредит')).toBeInTheDocument();
    expect(screen.getByText('Контакты')).toBeInTheDocument();
    expect(screen.getByText('Задать вопрос')).toBeInTheDocument();
  });
});
