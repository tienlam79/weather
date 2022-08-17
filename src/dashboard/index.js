import React, { useState } from 'react';
import DashboardHeader from './dashboard.header';
import DashboardBody from './dashboard.body';
import DashboardFooter from './dashboard.footer';
import DashboardChart from './dashboard.chart';
import './dashboard.css';
import { IP_LOCATION, MOON_DATA, SUN_DATA, TIDE_DATA, WEATHER_DATA } from './dashboard.constant';

const Dashboard = () => {
  const [location] = useState(IP_LOCATION);
  const [weather] = useState(WEATHER_DATA);
  const now = new Date();

  return (
    <div className='dashboard-container'>
      <div className='dashboard-content'>
        <div className='dashboard-body'>
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
      </div>
      <DashboardChart
        date={now}
        tideData={TIDE_DATA}
        sunData={SUN_DATA}
        moonData={MOON_DATA}
      />
    </div>
  );
}


export default Dashboard;
