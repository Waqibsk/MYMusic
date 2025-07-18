import './assets/main.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Favourites from './pages/Favourites';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
