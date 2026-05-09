import React from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { AdminTitleCard } from '../../components/AdminTitleCard';
import { AddCandidate } from '../../components/AddCandidate';
import { AdminCandidateList } from '../../components/AdminCandidateList';
import { ElectionWindow } from '../../components/ElectionWindow';
import { FinalizationCard } from '../../components/FinalizationCard';
import { Footer } from '../../components/Footer';

import './AdminPortal.css'

export const AdminPortal = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      
      <div className="admin-main">
        <Navbar />
        <AdminTitleCard />
        <div className="admin-content-grid">
          <div className="admin-left-col">
            <AddCandidate />
            <AdminCandidateList />
          </div>
          
          <div className="admin-right-col">
            <ElectionWindow />
            <FinalizationCard />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
