import React, { memo } from 'react';
import { barsIcon, bellIcon } from 'assets/images';
import './dashboard.header.scss';

const DashboardHeader = ({ location, date }) => {
  return (
    <div className='dashboard-header-container'>
      <img src={barsIcon} className='dashboard-header-menu-icon' alt='menu-icon' />
      <div>
        <div className='dashboard-header-location'>
          {location?.city}
        </div>
        <div className='dashboard-header-date'>
          {date?.toLocaleString()}
        </div>
      </div>
      <img src={bellIcon} className='dashboard-header-notify-icon' alt='notify-icon' />
    </div>
  );
}

export default memo(DashboardHeader);
