
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

export const diffMinutes = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60));

export const addMinutes = (date, minutes) => new Date(date.getTime() + minutes*60000);

export const getTime = (date) => {
  const time =  date.toLocaleTimeString("en-us", { hour: "2-digit", minute: "2-digit" });
  return time?.toLocaleLowerCase();
}
