import React from 'react';
import temperatureIcon from './images/temperature.svg';
import humidityIcon from './images/humidity.svg';
import CloudImg from './images/cloud.png';

const DashboardBody = ({ status,  temp, hum }) => {
  return (
    <div className='dashboardBody-container'>
      <img src={CloudImg} className='dashboardBody-cloud-img' alt='weather-status-icon' />
      <div>
        <div className='dashboardBody-status'>{status}</div>
        <div className='dashboardBody-info-row'>
          <Item icon={temperatureIcon} value={`${temp.value}${temp.units}`} alt='temp-icon' /> 
          <Item icon={humidityIcon} value={`${hum.value}${hum.units}`} alt='humi-icon' /> 
        </div>
      </div>
    </div>
  );
}

const Item = ({ value, icon, alt }) => {
  return (
    <div className='dashboardBody-info-item'>
      <div style={{ width: '30px', height: '30px' }}>
        <img src={icon} className='dasboardBody-info-icon' alt={alt} />
      </div>
      <span className='dashboardBody-info-value'>{value}</span>
    </div>
  );
}

export default DashboardBody;
