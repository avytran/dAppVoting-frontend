import React from 'react';
import { Navbar } from '../../components/Navbar';
import { TitleCard } from '../../components/TitleCard';
import { CandidateList } from '../../components/CandidateList';
import { MetricsCard } from '../../components/MetricsCard';
import { ActivityCard } from '../../components/ActivityCard';
import { Footer } from '../../components/Footer';
import './Dashboard.css';

export const Dashboard = () => {
  return (
    <div className="public-dashboard-wrapper">
      <Navbar />

      <main className="dashboard-content">
        <div className="container-max">
          <section className="banner-section">
            <TitleCard />
          </section>

          <div className="dashboard-grid">
            <div className="main-column">
              <CandidateList />
            </div>

            <aside className="side-column">
              <MetricsCard />
              <ActivityCard />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};