import {BASE_CURRENCY} from '../const';

export default class Api {

  _host = 'https://api.frankfurter.app';
  _currencies = 'RUB,EUR,GBP,CNY';

  async getCurrencyRates(date) {
    const res = await fetch(`${this._host}/${date}?from=${BASE_CURRENCY}&to=${this._currencies}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${`${this._host}/${date}?from=${BASE_CURRENCY}&to=${this._currencies}`}, received ${res.status}`);
    }

    const body = await res.json();

    return body;
  };
}
