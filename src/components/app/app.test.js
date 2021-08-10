import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

import App from './app';

let history;

describe('Component: App', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    const buttonCount = 2;

    render(
      <Router history={history}>
        <App />
      </Router>,
    );

    expect(screen.getByRole('heading', {level: 1})).toBeInTheDocument();
    expect(screen.getByText('Войти в Интернет-банк')).toBeInTheDocument();
    expect(screen.getByAltText('Изображение кредитных карт')).toBeInTheDocument();
    expect(screen.getByLabelText('У меня есть')).toBeInTheDocument();
    expect(screen.getByLabelText('Хочу приобрести')).toBeInTheDocument();
    expect(screen.getByLabelText('Выберите дату')).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBe(buttonCount);
  });
});
