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

const getOrdinalIndicator = (d) => {
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
  return `${date.getDate()}${nth} ${date.toLocaleString('default', { month: 'long' })}`;
}
