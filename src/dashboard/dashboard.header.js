import React from 'react';
import barsolidIcon from './images/bars-solid.svg';
import bellsolidIcon from './images/bell-solid.svg';

const DashboardHeader = () => {
  return (
    <div className='dashboardHeader-container'>
      <img src={barsolidIcon} className='dashboardHeader-menu-icon' />
      <div className='dashboardHeader-location'>
        <div className='dashboardHeader-header'>
          Weather
        </div>
        <div className='dashboardHeader-title'>
          Ho Chi Minh City
        </div>
      </div>
      <img src={bellsolidIcon} className='dashboardHeader-notify-icon' />
    </div>
  );
}

export default DashboardHeader;