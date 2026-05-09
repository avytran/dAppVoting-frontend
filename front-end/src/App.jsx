import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Bỏ BrowserRouter/Router ở đây
import { Dashboard } from './pages/Dashboard';
import { AdminPortal } from './pages/AdminPortal';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* Main Page */}
        <Route path="/" element={<Dashboard />} />
        
        {/* Admin Management Portal */}
        <Route path="/admin" element={<AdminPortal />} />
      </Routes>
    </div>
  );
}

export default App;