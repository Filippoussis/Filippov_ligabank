import React, {useState, useEffect, useCallback, useRef} from 'react';
import dayjs from 'dayjs';
import Api from '../../service/api';

import './currency-converter.scss';

const CURRENCIES = ['RUB', 'USD', 'EUR', 'GBP', 'CNY'];
const BASE_CURRENCY = 'USD';
const DEFAULT_SELL_CURRENCY = 'RUB';
const DEFAULT_BUY_CURRENCY = 'USD';

const api = new Api();

function CurrencyConverter({addResult}) {
  const inputRef = useRef(null);

  const today = dayjs().format('YYYY-MM-DD');
  const minDate = dayjs().subtract(7, 'day').format('YYYY-MM-DD');

  const [formData, setFormData] = useState({
    'amount-currency-sell':  '1000',
    'amount-currency-buy': '',
    'sell-currency': DEFAULT_SELL_CURRENCY,
    'buy-currency': DEFAULT_BUY_CURRENCY,
  });

  const [currencyQuotes, setCurrencyRates] = useState({
    [BASE_CURRENCY]: 1,
  });

  const request = useCallback(() => {
    api.getCurrencyRates('latest')
      .then(({rates}) => {
        setCurrencyRates((state) => {
          return {
            ...state,
            ...rates,
          };
        });
      });
  }, []);

  useEffect(() => request(), [request]);

  useEffect(() => setFormData((state) => {

    if (Object.keys(currencyQuotes).length <= 1) {
      return state;
    }

    return {
      ...state,
      'amount-currency-buy': (state['amount-currency-sell'] * currencyQuotes[state['buy-currency']] / currencyQuotes[state['sell-currency']]).toFixed(4),
    }
  }), [currencyQuotes]);

  const handleChangeSelectCurrency = (evt) => {
    const {name, value} = evt.target;

    setFormData((state) => {

      const updatedState = {
        ...state,
        [name]: value,
      };

      return {
        ...updatedState,
        'amount-currency-buy': (updatedState['amount-currency-sell'] * currencyQuotes[updatedState['buy-currency']] / currencyQuotes[updatedState['sell-currency']]).toFixed(4),
      };
    })
  };

  const handleChangeAmountCurrency = (evt) => {
    const {value, name} = evt.target;

    setFormData((state) => {

      const updatedState = {
        ...state,
        [name]: value,
      };

      switch(name) {
        case 'amount-currency-sell':
          return {
            ...updatedState,
            'amount-currency-buy': (value * currencyQuotes[updatedState['buy-currency']] / currencyQuotes[updatedState['sell-currency']]).toFixed(4),
          };

        case 'amount-currency-buy':
          return {
            ...updatedState,
            'amount-currency-sell': (value * currencyQuotes[updatedState['sell-currency']] / currencyQuotes[updatedState['buy-currency']]).toFixed(4),
          };

        default: return {...updatedState};
      }
    })
  };


  const handleChangeSelectDate = (evt) => {
    api.getCurrencyRates(evt.target.value)
      .then(({rates}) => {
        setCurrencyRates((state) => {
          return {
            ...state,
            ...rates,
          };
        });
      })
  };

   const handleSubmit = (evt) => {
    evt.preventDefault();
    addResult({
      date: dayjs(inputRef.current.value).format('DD.MM.YYYY'),
      amountCurrencySell: formData['amount-currency-sell'].replace('.', ','),
      currencySell: formData['sell-currency'],
      amountCurrencyBuy: formData['amount-currency-buy'].replace('.', ','),
      currencyBuy: formData['buy-currency'],
    })
  };

  const options = CURRENCIES.map((item) => <option key={item} value={item}>{item}</option>);

  return (
    <section className="currency-converter">
      <h2 className="currency-converter__title">Конвертер валют</h2>
      <form onSubmit={handleSubmit}>

        <div className="currency-converter__item">
          <label htmlFor="amount-currency-sell">У меня есть
            <input id="amount-currency-sell" name="amount-currency-sell" type="number" min="0" value={formData['amount-currency-sell']} onChange={handleChangeAmountCurrency} />
          </label>
          <select name="sell-currency" defaultValue={formData['sell-currency']} onChange={handleChangeSelectCurrency}>
            {options}
          </select>
        </div>
        <div className="currency-converter__item">
          <label htmlFor="amount-currency-buy">Хочу приобрести
            <input id="amount-currency-buy" name="amount-currency-buy" type="number" min="0" value={formData['amount-currency-buy']} onChange={handleChangeAmountCurrency} />
          </label>
          <select name="buy-currency" defaultValue={formData['buy-currency']} onChange={handleChangeSelectCurrency}>
            {options}
          </select>
        </div>

        <label htmlFor="calendar"><span className="visually-hidden">Выберите дату</span><input id="calendar" className="currency-converter__calendar" type="date" ref={inputRef} defaultValue={today} max={today} min={minDate} onChange={handleChangeSelectDate} /></label>
        <button className="main-button main-button--save-result" type="submit">Сохранить результат</button>
      </form>
    </section>
  );
}

export default CurrencyConverter;
