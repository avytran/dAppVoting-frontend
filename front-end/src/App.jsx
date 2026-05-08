import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AdminTitleCard from './components/AdminCards/AdminTitleCard';
import FinalizationCard from './components/AdminCards/FinalizationCard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar /> 
      
      {/* Phần nội dung chính nằm ở giữa */}
      <main style={{ padding: '20px 40px', minHeight: '70vh' }}>
        <AdminTitleCard />
        
      
        <FinalizationCard />
      </main>

      <Footer />
    </div>
  );
}

export default App;