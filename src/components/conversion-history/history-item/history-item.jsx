import React from 'react';

import './history-item.scss';

function HistoryItem({item}) {
  const {date, amountCurrencySell, currencySell, amountCurrencyBuy, currencyBuy} = item;
  return (
    <div className="history-item">
      <span className="history-item__date">{date}</span>
      <div className="history-item__sell">
        <span>{amountCurrencySell}</span>&nbsp;
        <span>{currencySell}</span>
      </div>
      <div className="history-item__buy">
        <span>{amountCurrencyBuy}</span>&nbsp;
        <span>{currencyBuy}</span>
      </div>
    </div>
  );
}

export default HistoryItem;
