import React, {useState} from 'react';
import Header from '../header/header';
import Hero from '../hero/hero';
import CurrencyConverter from '../currency-converter/currency-converter';
import СonversionHistory from '../conversion-history/conversion-history';
import Footer from '../footer/footer';

let id = 1;

function App() {

  const [historyData, setHistoryData] = useState([]);

  const addResult = (data) => {

    const newResult = {
      id: id++,
      ...data,
    }

    if (historyData.length === 10) {
      setHistoryData((state) => {
        return [
          ...state.slice(1),
          newResult,
        ];
      });

      return;
    }

    setHistoryData((state) => {
      return [
        ...state,
        newResult,
      ];
    });
  };

  const clearHistory = () => {
    id = 1;
    setHistoryData([]);
  }

  return (
    <>
      <Header />
      <Hero />
      <CurrencyConverter addResult={addResult} />
      <СonversionHistory historyData={historyData} clearHistory={clearHistory} />
      <Footer />
    </>
  );
}

export default App;
