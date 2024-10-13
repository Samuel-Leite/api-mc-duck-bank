// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Use Routes em vez de Switch
import LoginPage from './pages/LoginPage'; 
import HomePage from './pages/HomePage'; // Certifique-se de que você tenha uma página inicial

import '../src/styles/App.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} /> {/* Rota para Login */}
          <Route path="/home" element={<HomePage />} /> {/* Rota para Home */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
