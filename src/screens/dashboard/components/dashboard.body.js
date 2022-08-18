import React from 'react';
import { temperatureIcon, humidityIcon, cloudImg } from 'assets/images';
import './dashboard.body.scss';

const DashboardBody = ({ status, temp, hum }) => {
  return (
    <div className='dashboard-body-container'>
      <img src={cloudImg} className='dashboard-body-cloud-img' alt='weather-status-icon' />
      <div>
        <div className='dashboard-body-status'>{status}</div>
        <div className='dashboard-body-info-row'>
          <Item icon={temperatureIcon} value={`${temp.value}${temp.units}`} alt='temp-icon' /> 
          <Item icon={humidityIcon} value={`${hum.value}${hum.units}`} alt='humi-icon' /> 
        </div>
      </div>
    </div>
  );
}

const Item = ({ value, icon, alt }) => {
  return (
    <div className='dashboard-body-info-item'>
      <div style={{ width: '30px', height: '30px' }}>
        <img src={icon} className='dashboard-body-info-icon' alt={alt} />
      </div>
      <span className='dashboard-body-info-value'>{value}</span>
    </div>
  );
}

export default DashboardBody;
