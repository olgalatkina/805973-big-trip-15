import { MAX_NUMBER_OF_CITIES } from '../const';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export const getInfoTitle = (data) => {
  const destinations = data.map((point) => point.destination.name);
  return data.length <= MAX_NUMBER_OF_CITIES
    ? destinations.join('&nbsp;&mdash;&nbsp;')
    : `${destinations[0]}&nbsp;&mdash;&nbsp;&hellip;&nbsp;&mdash;&nbsp;${destinations[destinations.length - 1]}`;
};

export const getTotalPrice = (data) => {
  let totalPrice = 0;
  data.forEach((point) => {
    totalPrice += point.basePrice;
    point.offers ? totalPrice += point.offers.reduce((acc, offer) => acc += offer.price, 0) : 0;
  });
  return totalPrice;
};

export const getOffersByType = (type, offers) => {
  const currentOffers = offers.find((offer) => offer.type === type);
  return currentOffers.offers.length ? currentOffers.offers : [];
};

export const updatePoint = (points, update) => {
  const index = points.findIndex((point) => point.id === update.id);

  if (index === -1) {
    return points;
  }

  return [
    ...points.slice(0, index),
    update,
    ...points.slice(index + 1),
  ];
};

export const compareByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;
