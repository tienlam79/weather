import React from 'react';
import barsolidIcon from './images/bars.svg';
import bellsolidIcon from './images/bell.svg';

const DashboardHeader = ({ location, date }) => {
  return (
    <div className='dashboardHeader-container'>
      <img src={barsolidIcon} className='dashboardHeader-menu-icon' alt='menu-icon' />
      <div>
        <div className='dashboardHeader-location'>
          {location?.city}
        </div>
        <div className='dashboardHeader-date'>
          {date?.toLocaleString()}
        </div>
      </div>
      <img src={bellsolidIcon} className='dashboardHeader-notify-icon' alt='notify-icon' />
    </div>
  );
}

export default DashboardHeader;
