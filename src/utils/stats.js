
import { getDiff } from './date';

export const calculateMoney = (points) => {
  const money = {};
  points.forEach(({type, basePrice}) => {
    money[type] = money[type] !== undefined ? money[type] + basePrice : basePrice;
  });
  return new Map(Object.entries(money).sort((a, b) => b[1] - a[1]));
};

export const calculateType = (points) => {
  const types = {};
  points.forEach(({type}) => {
    types[type] = types[type] !== undefined ? types[type] + 1 : 1;
  });
  return new Map(Object.entries(types).sort((a, b) => b[1] - a[1]));
};

export const calculateTime = (points) => {
  const time = {};
  points.forEach(({type, dateFrom, dateTo}) => {
    time[type] = time[type] !== undefined ? time[type] + getDiff(dateFrom, dateTo) : getDiff(dateFrom, dateTo);
  });
  return new Map(Object.entries(time).sort((a, b) => b[1] - a[1]));
};
