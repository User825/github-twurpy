import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Header } from '../components/Header';

export const Main = () => {
  return (
    <>
      <Header
        title="Test cases"
        imgSrc="https://cdn-icons-png.flaticon.com/512/8422/8422383.png"
      />
      <div className="content">
        <ul className="mp_link-box">
          <li className="mp_link-item">
            <Link to="/marketCatalogue/">
              <Card
                text="Market Catalogue"
                imgSrc="https://cdn-icons-png.flaticon.com/512/3703/3703259.png"
              />
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
