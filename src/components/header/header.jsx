import React from 'react';
import SiteMenu from './site-menu/site-menu';
import Logo from '../logo/logo';
import UserBlock from './user-block/user-block';

import './header.scss';

function Header() {
  return (
    <header className="page-header">
      <Logo />
      <SiteMenu />
      <UserBlock />
    </header>
  );
}

export default Header;
