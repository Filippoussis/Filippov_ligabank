import React, {useState} from 'react';
import SiteMenuItem from './site-menu-item/site-menu-item';

import {SITE_MENU_LIST} from '../../../const';

import './site-menu.scss';

function SiteMenu() {

  const [isActiveItem, setActiveItem] = useState(null);

  const items = SITE_MENU_LIST.map((item) =>
    <li key={item}>
      <SiteMenuItem item={item} isActiveItem={isActiveItem} setActiveItem={setActiveItem}/>
    </li>
  );

  return (
    <ul className="site-menu">
      {items}
    </ul>
  );
}

export default SiteMenu;
