import React from 'react';
import { TEMPERATURE, HUMIDITY } from './dashboard.constant';
import barsolidIcon from './images/bars-solid.svg';
import CloudImg from './images/cloud.png';

const DashboardBody = () => {
  return (
    <div className='dashboardBody-container'>
      <div>
        <img src={CloudImg} className='dashboardBody-cloud-img' />
      </div>
      <div>
        <div className='dashboardBody-status'>Cloudy</div>
        <div className='dashboardBody-info-row'>
          <div classsName='dashboardBody-info-item'>
            {/* <img src={barsolidIcon} className='dasboardBody-info-icon' /> */}
            <span className='dashboardBody-info-value'>{TEMPERATURE}C</span>
          </div>
          <div className='dashboardBody-info-item'>
            {/* <img src={barsolidIcon} className='dasboardBody-info-icon' /> */}
            <span className='dashboardBody-info-value'>{HUMIDITY}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardBody;
