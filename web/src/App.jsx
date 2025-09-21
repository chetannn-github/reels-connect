import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { IGSuccess } from "./pages/IGSuccess";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/ig-success" element={<IGSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
