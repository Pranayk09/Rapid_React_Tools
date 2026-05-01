import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Translator from './pages/Translator';
import StringGenerator from './pages/StringGenerator';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Translator />} />
        <Route path="generator" element={<StringGenerator />} />
      </Route>
    </Routes>
  );
}

export default App;
