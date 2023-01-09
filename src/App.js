import React from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';

import { Main } from './pages/Main';
import { MarketCatalogue } from './pages/MarketCatalogue';
import { Page404 } from './pages/Page404';

import './App.css';

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || '';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/marketCatalogue/" element={<MarketCatalogue />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
