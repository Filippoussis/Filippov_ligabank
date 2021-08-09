import React from 'react';

function ClearHistoryButton({clearHistory}) {
  return (
    <button className="main-button main-button--clear-history" type="button" onClick={clearHistory}>Очистить историю</button>
  );
}

export default ClearHistoryButton;
