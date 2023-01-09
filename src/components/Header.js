import React from 'react';
import { Link } from 'react-router-dom';

export const Header = ({ title, imgSrc, hasBackButton = false }) => {
  return (
    <header className="header">
      <img
        width="40"
        height="40"
        className="header__logo"
        src={imgSrc}
        alt="logo"
      />
      <h1 className="header__title">{title}</h1>
      {hasBackButton && (
        <Link to="/" className="header__back-link">
          {' '}
          ← Back{' '}
        </Link>
      )}
    </header>
  );
};
