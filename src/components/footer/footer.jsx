import React from 'react';
import Official from './official/official';
import SiteSections from './site-sections/site-sections';
import ShortPhone from './short-phone/short-phone';
import FreePhone from './free-phone/free-phone';
import Social from './social/social';

import './footer.scss';

function Footer() {
  return (
    <footer className="page-footer">
      <Official />
      <SiteSections />
      <ShortPhone />
      <FreePhone />
      <Social />
    </footer>
  );
}

export default Footer;
