// src/App.js
import React from "react";
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Use Routes em vez de Switch
=======
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Use Routes em vez de Switch
>>>>>>> welcome
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import WelcomePage from "./pages/WelcomePage";

import "../src/styles/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<WelcomePage />} />{" "}
=======
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          {/* Redireciona a raiz para /welcome */}
          <Route path="/welcome" element={<WelcomePage />} />
>>>>>>> welcome
          {/* Nova rota para WelcomePage */}
          <Route path="/authentication" element={<LoginPage />} />{" "}
          {/* Rota para Login */}
          <Route path="/home" element={<HomePage />} /> {/* Rota para Home */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
