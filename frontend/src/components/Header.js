import React from 'react';
import headerLogo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header({userEmail, headerLink, addressBar, setLoggedIn}) {

  function handleExit(e) {
    if (headerLink === 'Выйти') {
      e.preventDefault()
      localStorage.removeItem('jwt') 
      setLoggedIn(false)
  }
  }

  return (
    <header className="header">
      <img
        className="header__logo opacity"
        src={headerLogo}
        alt="Логотип Место"
      />
      <div className="header__info">
        <h2> {userEmail}</h2>
        <Link
          to={addressBar}
          className="header__link"
          onClick={handleExit}
        >
          {headerLink}
        </Link>
      </div>
    </header>
  );
}

export default Header;
