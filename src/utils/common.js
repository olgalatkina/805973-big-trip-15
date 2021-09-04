import { MAX_NUMBER_OF_CITIES } from '../const';

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

export const getDestination = (city, dest) => dest.find((item) => item.name === city);

export const getIsDescription = (city, dest) => {
  const temp = dest.find((item) => item.name === city);
  return Boolean(temp.description);
};

export const getIsPictures = (city, dest) => {
  const temp = dest.find((item) => item.name === city);
  return Boolean(temp.pictures.length);
};

export const getIsOffers = (type, offers) => Boolean(getOffersByType(type, offers).length);

export const compareByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;
export const compareByStartTime = (eventA, eventB) => eventA.dateFrom - eventB.dateFrom;
export const compareByDuration = (pointA, pointB) => (pointB.dateTo - pointB.dateFrom) - (pointA.dateTo - pointA.dateFrom);
