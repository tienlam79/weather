import React from 'react';
import { TEMPERATURE, HUMIDITY } from './dashboard.constant';
import temperatureIcon from './images/temperature.svg';
import humidityIcon from './images/humidity.svg';
import CloudImg from './images/cloud.png';

const DashboardBody = () => {
  return (
    <div className='dashboardBody-container'>
      <img src={CloudImg} className='dashboardBody-cloud-img' />
      <div>
        <div className='dashboardBody-status'>Cloudy</div>
        <div className='dashboardBody-info-row'>
          <Item icon={temperatureIcon} value={`${TEMPERATURE}C`} /> 
          <Item icon={humidityIcon} value={`${HUMIDITY}%`} /> 
        </div>
      </div>
    </div>
  );
}

const Item = ({ value, icon }) => {
  return (
    <div className='dashboardBody-info-item'>
      <div style={{ width: '30px', height: '30px' }}>
        <img src={icon} className='dasboardBody-info-icon' />
      </div>
      <span className='dashboardBody-info-value'>{value}</span>
    </div>
  );
}

export default DashboardBody;
