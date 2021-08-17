import dayjs from 'dayjs';
import * as duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const formatDate = (date) => date ? dayjs(date).format('MM/DD/YY HH:mm') : dayjs().format('MM/DD/YY HH:mm');
export const getDate = (start) => dayjs(start).format('MMM DD');
export const getStart = (start) => dayjs(start).format('HH:mm');
export const getEnd = (end) => dayjs(end).format('HH:mm');
export const getGap = (start, end) => dayjs.duration(dayjs(end).diff(dayjs(start))).$d;

const getZeroSubStr = (number) => (number < 10) ? `0${number}` : `${number}`;

export const gapToString = (diff) => {
  const {days, hours, minutes} = diff;

  if (days > 0) {
    return `${getZeroSubStr(days)}D ${getZeroSubStr(hours)}H ${getZeroSubStr(minutes)}M`;
  } else if (hours > 0) {
    return `${getZeroSubStr(hours)}H ${getZeroSubStr(minutes)}M`;
  } else {
    return `${getZeroSubStr(minutes)}M`;
  }
};

export const compareByStartTime = (eventA, eventB) => eventA.dateFrom - eventB.dateFrom;
