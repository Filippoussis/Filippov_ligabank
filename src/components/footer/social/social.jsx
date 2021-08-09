import React from 'react';
import {Link} from 'react-router-dom';

import './social.scss';

function Social() {
  return (
    <ul className="social">
      <li>
        <Link to="#">
          <svg width="9" height="16">
            <use xlinkHref="#facebook"/>
          </svg>
        </Link>
      </li>
      <li>
        <Link to="#">
          <svg width="16" height="16">
            <use xlinkHref="#instagram"/>
          </svg>
        </Link>
      </li>
      <li>
        <Link to="#">
          <svg width="16" height="13">
            <use xlinkHref="#twitter"/>
          </svg>
        </Link>
      </li>
      <li>
        <Link to="#">
          <svg width="16" height="13">
            <use xlinkHref="#youtube"/>
          </svg>
        </Link>
      </li>
    </ul>
  );
}

export default Social;
