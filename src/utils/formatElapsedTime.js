const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;
const MONTH_MS = 30 * DAY_MS;
const YEAR_MS = 365 * DAY_MS;

const formatUnit = (value, unit) => `${value} ${unit}${value === 1 ? '' : 's'}`;

const formatElapsedTime = timestamp => {
  if (typeof timestamp !== 'number' || timestamp <= 0) {
    return '';
  }

  const elapsedMs = Math.max(0, Date.now() - timestamp);

  if (elapsedMs < HOUR_MS) {
    const minutes = Math.max(1, Math.floor(elapsedMs / MINUTE_MS));
    return formatUnit(minutes, 'minute');
  }

  if (elapsedMs < DAY_MS) {
    return formatUnit(Math.floor(elapsedMs / HOUR_MS), 'hour');
  }

  if (elapsedMs < MONTH_MS) {
    return formatUnit(Math.floor(elapsedMs / DAY_MS), 'day');
  }

  if (elapsedMs < YEAR_MS) {
    return formatUnit(Math.floor(elapsedMs / MONTH_MS), 'month');
  }

  return formatUnit(Math.floor(elapsedMs / YEAR_MS), 'year');
};

export default formatElapsedTime;
