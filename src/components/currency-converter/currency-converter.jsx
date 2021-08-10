import React, {useState, useEffect, useCallback, useRef} from 'react';
import dayjs from 'dayjs';
import Api from '../../service/api';

import WeekendMessage from '../weekend-message/weekend-message';

import {changeCurrency, isInteger} from '../../utils';
import {CURRENCIES, BASE_CURRENCY, DEFAULT_DATE_REQUEST, DefaultFormData} from '../../const';

import './currency-converter.scss';

const api = new Api();

function CurrencyConverter({addResult}) {
  const inputRef = useRef(null);

  const today = dayjs().format('YYYY-MM-DD');
  const minDate = dayjs().subtract(7, 'day').format('YYYY-MM-DD');

  const [formData, setFormData] = useState({
    'amount-currency-sell': DefaultFormData.AMOUNT_CURRENCY_SELL,
    'amount-currency-buy': DefaultFormData.AMOUNT_CURRENCY_BUY,
    'type-currency-sell': DefaultFormData.TYPE_CURRENCY_SELL,
    'type-currency-buy': DefaultFormData.TYPE_CURRENCY_BUY,
  });

  const [currencyQuotes, setCurrencyRates] = useState({
    [BASE_CURRENCY]: 1,
  });

  const request = useCallback(() => {
    api.getCurrencyRates(DEFAULT_DATE_REQUEST)
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

    const amountCurrency = state['amount-currency-sell'];
    const ratioSellCurencyToBase = currencyQuotes[state['type-currency-sell']];
    const ratioBuyCurencyToBase = currencyQuotes[state['type-currency-buy']];

    if (Object.keys(currencyQuotes).length <= 1) {
      return state;
    }

    return {
      ...state,
      'amount-currency-buy': changeCurrency(amountCurrency, ratioSellCurencyToBase, ratioBuyCurencyToBase, 'sell'),
    }
  }), [currencyQuotes]);

  const handleChangeSelectCurrency = (evt) => {
    const {name, value} = evt.target;

    setFormData((state) => {

      const updatedState = {
        ...state,
        [name]: value,
      };

      const amountCurrency = updatedState['amount-currency-sell'];
      const ratioSellCurencyToBase = currencyQuotes[updatedState['type-currency-sell']];
      const ratioBuyCurencyToBase = currencyQuotes[updatedState['type-currency-buy']];

      return {
        ...updatedState,
        'amount-currency-buy': changeCurrency(amountCurrency, ratioSellCurencyToBase, ratioBuyCurencyToBase, 'sell'),
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

      const ratioSellCurencyToBase = currencyQuotes[updatedState['type-currency-sell']];
      const ratioBuyCurencyToBase = currencyQuotes[updatedState['type-currency-buy']];

      switch(name) {
        case 'amount-currency-sell':
          return {
            ...updatedState,
            'amount-currency-buy': changeCurrency(value, ratioSellCurencyToBase, ratioBuyCurencyToBase, 'sell'),
          };

        case 'amount-currency-buy':
          return {
            ...updatedState,
            'amount-currency-sell': changeCurrency(value, ratioSellCurencyToBase, ratioBuyCurencyToBase, 'buy'),
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

    const amountCurrencySell = formData['amount-currency-sell'];
    const amountCurrencyBuy = formData['amount-currency-buy'];

    addResult({
      date: dayjs(inputRef.current.value).format('DD.MM.YYYY'),
      amountCurrencySell: isInteger(amountCurrencySell) ? amountCurrencySell : amountCurrencySell.replace('.', ','),
      currencySell: formData['type-currency-sell'],
      amountCurrencyBuy: isInteger(amountCurrencyBuy) ? amountCurrencyBuy : amountCurrencyBuy.replace('.', ','),
      currencyBuy: formData['type-currency-buy'],
    })
  };

  const options = CURRENCIES.map((item) => <option key={item} value={item}>{item}</option>);
  const day = inputRef.current !== null ? dayjs(inputRef.current.value).day() : null;
  const isWeekend = day === 0 || day === 6;

  return (
    <section className="currency-converter">
      <h2 className="currency-converter__title">Конвертер валют</h2>
      <form onSubmit={handleSubmit}>

        <div className="currency-converter__item">
          <label htmlFor="amount-currency-sell">У меня есть
            <input id="amount-currency-sell" name="amount-currency-sell" type="number" min="0" step="any" value={formData['amount-currency-sell']} onChange={handleChangeAmountCurrency} />
          </label>
          <select name="type-currency-sell" defaultValue={formData['type-currency-sell']} onChange={handleChangeSelectCurrency}>
            {options}
          </select>
        </div>
        <div className="currency-converter__item">
          <label htmlFor="amount-currency-buy">Хочу приобрести
            <input id="amount-currency-buy" name="amount-currency-buy" type="number" min="0" step="any" value={formData['amount-currency-buy']} onChange={handleChangeAmountCurrency} />
          </label>
          <select name="type-currency-buy" defaultValue={formData['type-currency-buy']} onChange={handleChangeSelectCurrency}>
            {options}
          </select>
        </div>

        <label htmlFor="calendar">
          <span className="visually-hidden">Выберите дату</span>
          <input id="calendar" className="currency-converter__calendar" type="date" ref={inputRef} defaultValue={today} max={today} min={minDate} onChange={handleChangeSelectDate} />
        </label>
        {isWeekend && <WeekendMessage />}
        <button className="main-button main-button--save-result" type="submit">Сохранить результат</button>
      </form>
    </section>
  );
}

export default CurrencyConverter;
