import React from 'react';
import {Link} from 'react-router-dom';

import cards1xWebp from './cards1x.webp';
import cards2xWebp from './cards2x.webp';

import './hero.scss';

function Hero() {
  return (
    <section className="hero">
      <div className="hero__header">
        <h1 className="hero__title">Лига Банк</h1>
        <p className="hero__description">Кредиты на любой случай</p>
        <Link to="#" className="hero__link">Рассчитать кредит</Link>
      </div>
      <img className="hero__cards" src={cards1xWebp} srcSet={cards2xWebp} alt="Изображение кредитных карт" width="398" height="240"></img>
    </section>
  );
}

export default Hero;
