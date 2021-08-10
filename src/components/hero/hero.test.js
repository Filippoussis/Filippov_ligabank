import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

import Hero from './hero';

let history;

describe('Component: Hero', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Hero />
      </Router>,
    );

    expect(screen.getByRole('heading', {level: 1})).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText('Лига Банк')).toBeInTheDocument();
    expect(screen.getByText('Кредиты на любой случай')).toBeInTheDocument();
    expect(screen.getByText('Рассчитать кредит')).toBeInTheDocument();
    expect(screen.getByAltText('Изображение кредитных карт')).toBeInTheDocument();
  });
});
