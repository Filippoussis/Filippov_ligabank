import React from 'react';
import HistoryItem from './history-item/history-item';
import ClearHistoryButton from './clear-history-button/clear-history-button';

import './conversion-history.scss';

function СonversionHistory({historyData, clearHistory}) {

  const items = historyData.map((item) => <li key={item.id}><HistoryItem item={item} /></li>)

  return (
    <section className="conversion-history">
      <h3 className="conversion-history__title">История конвертации</h3>
      <div className="conversion-history__line">
        <ul className="conversion-history__list">{items}</ul>
      </div>
      <ClearHistoryButton clearHistory={clearHistory} />
    </section>
  );
}

export default СonversionHistory;
