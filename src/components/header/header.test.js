import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

import Header from './header';

let history;

describe('Component: Header', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    const linksCount = 6;

    render(
      <Router history={history}>
        <Header />
      </Router>,
    );

    expect(screen.getAllByRole('link').length).toBe(linksCount);
    expect(screen.getByText('ЛИГА Банк')).toBeInTheDocument();
    expect(screen.getByText('Услуги')).toBeInTheDocument();
    expect(screen.getByText('Рассчитать кредит')).toBeInTheDocument();
    expect(screen.getByText('Конвертер валют')).toBeInTheDocument();
    expect(screen.getByText('Контакты')).toBeInTheDocument();
    expect(screen.getByText('Задать вопрос')).toBeInTheDocument();
    expect(screen.getByText('Войти в Интернет-банк')).toBeInTheDocument();
  });
});
