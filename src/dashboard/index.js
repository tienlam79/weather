import React, { useState } from 'react';
import DashboardHeader from './dashboard.header';
import DashboardBody from './dashboard.body';
import DashboardFooter from './dashboard.footer';
// import DashboardChart from './dashboard.chart';
import DashboardCanvas from './dashboard.canvas';
import './dashboard.css';
import { IP_LOCATION, WEATHER_DATA } from './dashboard.constant';

const Dashboard = () => {
  const [location] = useState(IP_LOCATION);
  const [weather] = useState(WEATHER_DATA);
  const now = new Date();

  return (
    <div className='dashboard-container'>
      <div className='dashboard-content'>
        <DashboardHeader
          location={location}
          date={now}
        />
        <DashboardBody
          status={weather.status}
          temp={weather.temp}
          hum={weather.hum}
        />
        <DashboardFooter
          rain={weather.rain}
          psi={weather.psi}
        />
      </div>
      <DashboardCanvas date={now} />
    </div>
  );
}


export default Dashboard;
