import React from 'react';

import DashboardHeader from './dashboard.header';
import DashboardBody from './dashboard.body';
import DashboardFooter from './dashboard.footer';
import DashboardChart from './dashboard.chart';
import './dashboard.css';

const Dashboard = () => {
  return (
    <div className='dashboard-container'>
      <div className='dashboard-content'>
        <DashboardHeader />
        <DashboardBody />
        <DashboardFooter />
      </div>
      <div className='dashboard-chart'>
        <DashboardChart />
      </div>
    </div>
  );
}

export default Dashboard;
