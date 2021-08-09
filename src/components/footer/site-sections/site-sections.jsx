import React from 'react';
import {Link} from 'react-router-dom';
import {SITE_MENU_LIST_FOOTER} from '../../../const';

import './site-sections.scss';

function SiteSections() {

  const items = SITE_MENU_LIST_FOOTER.map((item) =><li key={item}><Link to="#" className="site-sections__link">{item}</Link></li>);

  return (
    <ul className="site-sections">
      {items}
    </ul>
  );
}

export default SiteSections;
