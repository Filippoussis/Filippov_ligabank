import React from 'react';
import {Link} from 'react-router-dom';

import './user-block.scss';

function UserBlock() {
  return (
    <Link to="#" className="user-block" aria-label="icon-enter">
      <svg width="20" height="22">
        <use xlinkHref="#enter"/>
      </svg>
      Войти в Интернет-банк
    </Link>
  );
}

export default UserBlock;
