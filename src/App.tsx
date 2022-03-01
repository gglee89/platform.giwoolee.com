import React from 'react';
import {
  BrowserRouter, Routes, Route} from 'react-router-dom';

// Pages
import Home from './pages/Home'
import Movies from './pages/Movies'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:movieId" element={<Movies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
