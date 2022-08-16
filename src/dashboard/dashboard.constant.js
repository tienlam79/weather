export const TIDE_COLOR = 'rgba(134, 222, 246)';
export const SUNRISE_COLOR = 'orange';
export const MARKER_SIZE = 30;

export const LEGEND_DATA = [
  { key: 'tide', title: 'Tide', color: TIDE_COLOR },
  { key: 'sunrise_sunset', title: 'Sunrise & Sunset', color: SUNRISE_COLOR },
];

export const IP_LOCATION = {
  country: "Vietnam",
  country_code: "VN",
  continent: "Asia",
  continent_code: "AS",
  city: "Ho Chi Minh City",
  timezone: "Asia/Ho_Chi_Minh",
  currency: "VND",
};

export const WEATHER_DATA = {
  status: 'Cloudy',
  temp: {
    value: '29.2',
    units: 'C',
  },
  hum: {
    value: '73',
    units: '%',
  },
  psi: {
    value: '23',
    status: 'Good',
  },
  rain: {
    value: '0',
    units: 'mm'
  }
};

export const TIDE_DATA = [
  { x: new Date(2022, 8, 15, 4, 46, 0), y: 3.82 },
  { x: new Date(2022, 8, 15, 10, 35, 0), y: 1.7 },
  { x: new Date(2022, 8, 15, 16, 13, 0), y: 3.6 },
  { x: new Date(2022, 8, 15, 22, 43, 0), y: 0.64 },

  { x: new Date(2022, 8, 16, 5, 18, 0), y: 3.82 },
  { x: new Date(2022, 8, 16, 11, 22, 0), y: 1.42 },
  { x: new Date(2022, 8, 16, 17, 11, 0), y: 3.49 },
  { x: new Date(2022, 8, 16, 23, 23, 0), y: 1 },

  { x: new Date(2022, 8, 17, 5, 48, 0), y: 3.78 },
  { x: new Date(2022, 8, 17, 12, 5, 0), y: 1.2 },
  { x: new Date(2022, 8, 17, 18, 8, 0), y: 3.37 },
  { x: new Date(2022, 8, 17, 23, 5, 0), y: 1.07 },
];

export const SUN_DATA = [
  { x: new Date(2022, 8, 15, 5, 42, 0), y: new Date(2022, 8, 15, 18, 10, 0) },
  { x: new Date(2022, 8, 16, 5, 40, 0), y: new Date(2022, 8, 16, 18, 10, 0) },
  { x: new Date(2022, 8, 17, 5, 41, 0), y: new Date(2022, 8, 17, 18, 10, 0) }
];

export const MOON_DATA = [
  { x: new Date(2022, 8, 15, 19, 29, 0), y: new Date(2022, 8, 16, 7, 38, 0) },
  { x: new Date(2022, 8, 16, 20, 14, 0), y: new Date(2022, 8, 17, 8, 31, 0) },
  { x: new Date(2022, 8, 17, 20, 56, 0), y: new Date(2022, 8, 18, 9, 22, 0) }
];

export const getOrdinalIndicator = (d) => {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}

export const getChartTitle = (date) => {
  const nth = getOrdinalIndicator(date.getDate());
  return `<span>${date.getDate()}<sup>${nth}</sup> ${date.toLocaleString('default', { month: 'long' })}</span>`;
}