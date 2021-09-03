import dayjs from 'dayjs';
import * as duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import { FilterType } from '../const';

export const formatDate = (date) => dayjs(date).format('MM/DD/YY HH:mm');
export const getDate = (date) => dayjs(date).format('MMM DD');
export const getLastDay = (date) => dayjs(date).format('DD');
export const getEndingDate = (points) => {
  const beginning = points[0].dateFrom;
  const ending = points[points.length - 1].dateTo;
  return beginning.getMonth() === ending.getMonth() ? getLastDay(ending) : getDate(ending);
};
export const getStart = (start) => dayjs(start).format('HH:mm');
export const getEnd = (end) => dayjs(end).format('HH:mm');
export const getGap = (start, end) => dayjs.duration(dayjs(end).diff(dayjs(start))).$d;

const getZeroSubStr = (number) => (number < 10) ? `0${number}` : `${number}`;

export const gapToString = ({days, hours, minutes}) => {
  if (days > 0) {
    return `${getZeroSubStr(days)}D ${getZeroSubStr(hours)}H ${getZeroSubStr(minutes)}M`;
  } else if (hours > 0) {
    return `${getZeroSubStr(hours)}H ${getZeroSubStr(minutes)}M`;
  } else {
    return `${getZeroSubStr(minutes)}M`;
  }
};

export const getDiff = (start, end) =>  dayjs(dayjs(end).diff(dayjs(start)));
export const diffToString = (diff) => gapToString(dayjs.duration(diff).$d);

export const getActualDate = () => dayjs().toDate();

const getMootPoints = (points) => points.filter((point) => point.dateFrom < getActualDate() && point.dateTo > getActualDate());
const getFuturePoints = (points) => points.filter((point) => point.dateFrom >= getActualDate());
const getPastPoints = (points) => points.filter((point) => point.dateTo < getActualDate());

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => [...getMootPoints(points), ...getFuturePoints(points)],
  [FilterType.PAST]: (points) => [...getPastPoints(points), ...getMootPoints(points)],
};
