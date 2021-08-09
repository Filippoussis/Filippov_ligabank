import React from 'react';
import './free-phone.scss'

function FreePhone() {
  return (
    <div className="free-phone">
      <a className="free-phone__tel" href="tel:+78001112233">8 800 111 22 33</a>
      <p className="free-phone__description">Бесплатный для всех городов России</p>
    </div>
  );
}

export default FreePhone;
