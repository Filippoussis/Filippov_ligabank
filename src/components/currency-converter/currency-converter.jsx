import React, {useState, useEffect, useCallback, useRef} from 'react';
import dayjs from 'dayjs';
import Api from '../../service/api';

import './currency-converter.scss';

const CURRENCIES = ['RUB', 'USD', 'EUR', 'GBR', 'CNY'];
const BASE_CURRENCY = 'USD';
const DEFAULT_SELL_CURRENCY = 'RUB';
const DEFAULT_BUY_CURRENCY = 'USD';

const api = new Api();

function CurrencyConverter({addResult}) {
  const inputRef = useRef(null);

  const today = dayjs().format('YYYY-MM-DD');
  const minDate = dayjs().subtract(7, 'day').format('YYYY-MM-DD');

  const [formData, setFormData] = useState({
    'amount-currency-sell': '',
    'amount-currency-buy': '',
    'sell-currency': DEFAULT_SELL_CURRENCY,
    'buy-currency': DEFAULT_BUY_CURRENCY,
  });

  const [currencyQuotes, setCurrencyRates] = useState({});

  const request = useCallback(() => {
    api.getCurrencyRates('latest')
      .then(({rates}) => {
        setCurrencyRates(rates);
      })
  }, []);

  useEffect(() => request(), [request]);

  const handleChangeSelectCurrency = (evt) => {
    const {name, value} = evt.target;

    setFormData((state) => {
      return {
        ...state,
        [name]: value,
        'amount-currency-sell': '',
        'amount-currency-buy': '',
      }
    })
  };

  const handleChangeAmountSellCurrency = (evt) => {
    const {value} = evt.target;

    setFormData((state) => {
      const coefficientBuyCurrencyToBase = state['buy-currency'] !== BASE_CURRENCY ? currencyQuotes[state['buy-currency']] : 1;
      const coefficientSellCurrencyToBase = state['sell-currency'] !== BASE_CURRENCY ? currencyQuotes[state['sell-currency']] : 1;

      return {
        ...state,
        'amount-currency-sell': value,
        'amount-currency-buy': (value*coefficientBuyCurrencyToBase/coefficientSellCurrencyToBase).toFixed(4),
      }
    })
  };

  const handleChangeAmountBuyCurrency = (evt) => {
    const {value} = evt.target;

    setFormData((state) => {
      const coefficientBuyCurrencyToBase = state['buy-currency'] !== BASE_CURRENCY ? currencyQuotes[state['buy-currency']] : 1;
      const coefficientSellCurrencyToBase = state['sell-currency'] !== BASE_CURRENCY ? currencyQuotes[state['sell-currency']] : 1;

      return {
        ...state,
        'amount-currency-sell': (value*coefficientSellCurrencyToBase/coefficientBuyCurrencyToBase).toFixed(4),
        'amount-currency-buy': value,
      }
    })
  };

  const handleChangeSelectDate = (evt) => {
    api.getCurrencyRates(evt.target.value)
      .then(({rates}) => {
        setCurrencyRates(rates);
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
            <input id="amount-currency-sell" name="amount-currency-sell" type="number" value={formData['amount-currency-sell']} placeholder="0" onChange={handleChangeAmountSellCurrency} />
          </label>
          <select name="sell-currency" defaultValue={formData['sell-currency']} onChange={handleChangeSelectCurrency}>
            {options}
          </select>
        </div>
        <div className="currency-converter__item">
          <label htmlFor="amount-currency-buy">Хочу приобрести
            <input id="amount-currency-buy" name="amount-currency-buy" type="number" value={formData['amount-currency-buy']} placeholder="0" onChange={handleChangeAmountBuyCurrency} />
          </label>
          <select name="buy-currency" defaultValue={formData['buy-currency']} onChange={handleChangeSelectCurrency}>
            {options}
          </select>
        </div>

        <div><input className="currency-converter__calendar" type="date" ref={inputRef} defaultValue={today} max={today} min={minDate} onChange={handleChangeSelectDate} /></div>
        <button className="main-button main-button--save-result" type="submit">Сохранить результат</button>
      </form>
    </section>
  );
}

export default CurrencyConverter;
