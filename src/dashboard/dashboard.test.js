import { render, screen } from '@testing-library/react';
import Dashboard from './index';
import DashboardHeader  from './dashboard.header';
import DashboardBody from './dashboard.body';
import DashboardFooter from './dashboard.footer';
import {  IP_LOCATION, WEATHER_DATA } from './dashboard.constant';
import DashboardChart from './dashboard.chart';
import React from 'react';

const resizeWindow = (x, y) => {
  window.innerWidth = x;
  window.innerHeight = y;
  window.dispatchEvent(new Event('resize'));
}

test('<Dashboard> should render chart', () => {
  render(<Dashboard />);
});

test('<DashboardHeader> should show city name and current date time', () => {
  const fakeDate = new Date(1994, 8, 13);
  render(<DashboardHeader location={IP_LOCATION} date={new Date(1994, 8, 13)} />)
  const cityElement = screen.getByText(IP_LOCATION.city);
  expect(cityElement).toBeInTheDocument();
  const dateElement = screen.getByText(fakeDate.toLocaleString());
  expect(dateElement).toBeInTheDocument();
});

test('<DashboardBody> should show weather status, temperature and humidity', () => {
  render(<DashboardBody status={WEATHER_DATA.status} temp={WEATHER_DATA.temp} hum={WEATHER_DATA.hum} />)
  const statusElement = screen.getByText(WEATHER_DATA.status);
  expect(statusElement).toBeInTheDocument();
  const tempElement = screen.getByText(`${WEATHER_DATA.temp.value}${WEATHER_DATA.temp.units}`);
  expect(tempElement).toBeInTheDocument();
  const humElement = screen.getByText(`${WEATHER_DATA.hum.value}${WEATHER_DATA.hum.units}`);
  expect(humElement).toBeInTheDocument();
});

test('<DashboardFooter> should show weather psi, rain', () => {
  render(<DashboardFooter psi={WEATHER_DATA.psi} rain={WEATHER_DATA.rain} />)
  const psiValueElement = screen.getByText(`${WEATHER_DATA.psi.value}`);
  expect(psiValueElement).toBeInTheDocument();
});

// test('<DashboardChart> should match title chart', () => {
//   const chartRef = React.createRef();
//   let fakeDate = new Date(2022, 8, 21);
//   let title = getChartTitle(fakeDate);
//   render(<DashboardChart ref={chartRef} date={fakeDate} />);
//   expect(title).toEqual(chartRef.current.getOptions().title.text);

//   fakeDate = new Date(2022, 8, 22);
//   title = getChartTitle(fakeDate);
//   render(<DashboardChart ref={chartRef} date={fakeDate}  />);
//   expect(title).toEqual(chartRef.current.getOptions().title.text);


//   fakeDate = new Date(2022, 8, 23);
//   title = getChartTitle(fakeDate);
//   render(<DashboardChart ref={chartRef} date={fakeDate}  />);
//   expect(title).toEqual(chartRef.current.getOptions().title.text);

//   fakeDate = new Date(2022, 8, 24);
//   title = getChartTitle(fakeDate);
//   render(<DashboardChart ref={chartRef} date={fakeDate}  />);
//   expect(title).toEqual(chartRef.current.getOptions().title.text);

// });

test('<DashboardChart> resize chart', () => {
  render(<DashboardChart date={new Date()} />);
  // resizeWindow(500, 300);
});

