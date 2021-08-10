export const isInteger = (value) => Number.isInteger(Number(value));

export const changeCurrency = (amountCurrency, ratioSellCurencyToBase, ratioBuyCurencyToBase, tradeAction) => {
  let result;

  switch(tradeAction) {
    case 'sell':
      result = amountCurrency * ratioBuyCurencyToBase / ratioSellCurencyToBase;
      break;

    case 'buy':
      result = amountCurrency * ratioSellCurencyToBase / ratioBuyCurencyToBase;
      break;

    default: throw new Error('Invalid tradeAction: expected "sell" or "buy"');
  }

  if (isInteger(result)) {
    return Math.trunc(result);
  }

  return result.toFixed(4);
};
