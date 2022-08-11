import React from 'react';
import barsolidIcon from './images/bars.svg';
import bellsolidIcon from './images/bell.svg';

const DashboardHeader = () => {
  return (
    <div className='dashboardHeader-container'>
      <img src={barsolidIcon} className='dashboardHeader-menu-icon' />
      <div className='dashboardHeader-location'>
        <div className='dashboardHeader-location'>
          Ho Chi Minh City
        </div>
        <div className='dashboardHeader-date'>
          {new Date().toLocaleString()}
        </div>
      </div>
      <img src={bellsolidIcon} className='dashboardHeader-notify-icon' />
    </div>
  );
}

export default DashboardHeader;
