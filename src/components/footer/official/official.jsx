import React from 'react';
import Logo from '../../logo/logo';

import './official.scss';

function Official() {
  return (
    <div className="official">
      <Logo />
      <div className="official__description">
        <address>150015, г. Москва, ул. Московская, д. 32</address>
        <p>Генеральная лицензия Банка России №1050</p>
        <p>&#9400; Лига Банк, 2019</p>
      </div>
    </div>
  );
}

export default Official;
