import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

import SiteMenu from './site-menu';

let history;

describe('Component: SiteMenu', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    const linksCount = 5;

    render(
      <Router history={history}>
        <SiteMenu />
      </Router>,
    );

    expect(screen.getAllByRole('link').length).toBe(linksCount);
    expect(screen.getByText('Услуги')).toBeInTheDocument();
    expect(screen.getByText('Рассчитать кредит')).toBeInTheDocument();
    expect(screen.getByText('Конвертер валют')).toBeInTheDocument();
    expect(screen.getByText('Контакты')).toBeInTheDocument();
    expect(screen.getByText('Задать вопрос')).toBeInTheDocument();
  });
});
