import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from './index';
import DashboardHeader  from './dashboard.header';
import DashboardBody from './dashboard.body';
import DashboardFooter from './dashboard.footer';
import { IP_LOCATION, WEATHER_DATA, TIDE_DATA, SUN_DATA, MOON_DATA, getOrdinalIndicator } from './dashboard.constant';
import DashboardChart, { LG_CHART_WIDTH, XS_CHART_WIDTH } from './dashboard.chart';
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

test('<DashboardChart> should match title chart', () => {
  let date = new Date(2022, 8, 21);
  render(
    <DashboardChart 
      date={new Date()}
      tideData={[{ x: date, y: 3.82 }, ...TIDE_DATA]}
      sunData={SUN_DATA}
      moonData={MOON_DATA}
    />
  );
  expect(screen.getByText(getOrdinalIndicator(date.getDate()))).toBeInTheDocument();

  date = new Date(2022, 8, 22);
  render(
    <DashboardChart 
      date={new Date()}
      tideData={[{ x: date, y: 3.82 }, ...TIDE_DATA]}
      sunData={SUN_DATA}
      moonData={MOON_DATA}
    />
  );
  expect(screen.getByText(getOrdinalIndicator(date.getDate()))).toBeInTheDocument();

  date = new Date(2022, 8, 23);
  render(
    <DashboardChart 
      date={new Date()}
      tideData={[{ x: date, y: 3.82 }, ...TIDE_DATA]}
      sunData={SUN_DATA}
      moonData={MOON_DATA}
    />
  );
  expect(screen.getByText(getOrdinalIndicator(date.getDate()))).toBeInTheDocument();

  date = new Date(2022, 8, 24);
  render(
    <DashboardChart 
      date={new Date()}
      tideData={[{ x: date, y: 3.82 }, ...TIDE_DATA]}
      sunData={SUN_DATA}
      moonData={MOON_DATA}
    />
  );
  expect(screen.getByText(getOrdinalIndicator(date.getDate()))).toBeInTheDocument();
});

test('<DashboardChart> should resize canvas with', () => {
  render(<DashboardChart
    date={new Date()}
    tideData={TIDE_DATA}
    sunData={SUN_DATA}
    moonData={MOON_DATA}
  />);
  resizeWindow(1024, window.innerHeight);
  const chartElement = document.getElementById('chartContainer');
  expect(chartElement.width).toEqual(XS_CHART_WIDTH);

  resizeWindow(1025, window.innerHeight);
  expect(chartElement.width).toEqual(LG_CHART_WIDTH);
});

test('<DashboardChart> should scroll canvas', () => {
  render(
    <DashboardChart
      date={new Date()}
      tideData={TIDE_DATA}
      sunData={SUN_DATA}
      moonData={MOON_DATA}
    />
  );
  const sunImgElement = document.getElementById('chartSunImg');
  const moonImgElement = document.getElementById('chartMoonImg');
  const scrollChartContainer = document.getElementById('chartWrapper');
  scrollChartContainer.addEventListener('scroll', () => { /* some callback */ });
 
  fireEvent.scroll(scrollChartContainer, { target: { scrollLeft: 500 } });
  expect(sunImgElement.style.display).toEqual('block');
  expect(moonImgElement.style.display).toEqual('none');

  fireEvent.scroll(scrollChartContainer, { target: { scrollLeft: 0 } });
  expect(sunImgElement.style.display).toEqual('none');

  fireEvent.scroll(scrollChartContainer, { target: { scrollLeft: 2000 } });
  expect(moonImgElement.style.display).toEqual('block');
});

