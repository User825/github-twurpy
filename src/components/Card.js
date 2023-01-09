import React from 'react';

export const Card = ({ text, imgSrc }) => (
  <div className="card">
    <img
      width="60"
      height="60"
      className="card__logo"
      src={imgSrc}
      alt="logo"
    />
    <p className="card__text">{text}</p>
  </div>
);
