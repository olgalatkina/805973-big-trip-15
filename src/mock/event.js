import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { Types, Destinations } from '../const';
import { getRandomInteger, shuffleArray } from '../utils/common';
import { DESTINATIONS } from './dest';
import { OFFERS } from './offers';

const generateType = (types) => {
  const values = Object.values(types).map((type) => type.toLowerCase());
  return values[getRandomInteger(0, values.length - 1)];
};

const generateName = () => {
  const destinations = Object.values(Destinations);
  return destinations[getRandomInteger(0, destinations.length - 1)];
};

const generatePointInfo = (name, points) => {
  for (const point of points) {
    if (point.name === name) {
      return point;
    }
  }
};

const generatePointOffers = (type, offers) => {
  for (const offer of offers) {
    if (offer.type === type) {
      const localOffers = offer.offers;
      return localOffers.length
        ? shuffleArray([...localOffers]).slice(0, getRandomInteger(0, Math.min(localOffers.length - 1, 4)))
        : [];
    }
  }
};

const generateDateFrom = () => {
  const maxDaysGap = 15;
  const maxMinuteGap = 30;
  const maxHourGap = 12;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const minuteGap = getRandomInteger(-maxMinuteGap, maxMinuteGap);
  const hourGap = getRandomInteger(-maxHourGap, maxHourGap);

  return dayjs().add(daysGap, 'day').add(hourGap, 'hour').add(minuteGap, 'minute').toDate();
};

export const generateEvent = () => {
  const type = generateType(Types);
  const dateFrom = generateDateFrom();
  const dateTo = dayjs(dateFrom).add(getRandomInteger(15, 1140), 'minute').toDate();

  return {
    type,
    destination: generatePointInfo(generateName(), DESTINATIONS),
    offers: generatePointOffers(type, OFFERS),
    dateFrom,
    dateTo,
    basePrice: getRandomInteger(10, 100) * 10,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    id: nanoid(),
  };
};
