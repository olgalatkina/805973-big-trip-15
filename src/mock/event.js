import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { Types, Destinations } from '../const';
import { getRandomInteger, shuffleArray } from '../utils/utils';

const generateType = (types) => {
  const keys = Object.keys(types);
  const key = keys[getRandomInteger(0, keys.length - 1)];
  return types[key];
};

const generateName = () => {
  const destinations = Object.values(Destinations);
  return destinations[getRandomInteger(0, destinations.length - 1)];
};

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generatePictures = () => {
  const res = [];
  for (let i = 0; i < getRandomInteger(0, 5); i++) {
    res.push({
      src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
      description: 'temp',
    });
  }
  return res;
};

const generatePointInfo = () => ({
  name: generateName(),
  description: generateDescription(),
  pictures: generatePictures(),
});

const generateOffers = () => {
  const titles = [
    // 'Upgrade to a business class',
    // 'Choose the radio station',
    // 'Add luggage',
    // 'Add meal',
    // 'Choose seats',
    // 'Travel by train',
    'Rent a car',
    'Order Uber',
    'Add breakfast',
    'Lunch in city',
    'Book tickets',
  ];

  const options = [];

  titles.forEach((title) => {
    options.push({
      title,
      price: getRandomInteger(5, 100),
    });
  });

  const res = [];
  const types = Object.values(Types);

  types.forEach((type) => {
    res.push({
      type: type.toLowerCase(),
      offers: shuffleArray([...options]).slice(0, getRandomInteger(0, options.length - 1)),
    });
  });

  return res;
};

const getPointOffers = (type, offers) => {
  for (const offer of offers) {
    if (offer.type === type.toLowerCase()) {
      return offer.offers.length ? offer.offers : null;
    }
  }
  return null;
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
  const dateTo = dayjs(dateFrom).add(getRandomInteger(15, 2280), 'minute').toDate();

  return {
    type,
    destination: generatePointInfo(),
    offers: getPointOffers(type, generateOffers()),
    dateFrom,
    dateTo,
    basePrice: getRandomInteger(10, 500),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    id: nanoid(),
  };
};
