import { getDate } from '../utils/utils';

const MAX_NUMBER_OF_CITIES = 3;

const getInfoTitle = (data) => {
  const destinations = [];

  for (const point of data) {
    destinations.push(point.destination.name);
  }
  const lastDest = destinations[destinations.length - 1];

  return data.length <= MAX_NUMBER_OF_CITIES
    ? destinations.join('&nbsp;&mdash;&nbsp;')
    : `${destinations[0]}&nbsp;&mdash;&nbsp;&hellip;&nbsp;&mdash;&nbsp;${lastDest}`;
};

const getTotalPrice = (data) => {
  let totalPrice = 0;

  data.forEach((point) => {
    totalPrice += point.basePrice;
    point.offers ? totalPrice += point.offers.reduce((acc, offer) => acc += offer.price, 0) : 0;
  });

  return totalPrice;
};

const createInfoTitleTemplate = (data) => {
  const lastEvent = data.length - 1;

  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${getInfoTitle(data)}</h1>
    <p class="trip-info__dates">${getDate(data[0].dateFrom)}&nbsp;&mdash;&nbsp;${getDate(data[lastEvent].dateFrom)}</p>
  </div>`;
};

const createInfoCostTemplate = (data) => (
  `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice(data)}</span>
  </p>`
);

export const createInfoTemplate = (data) => (
  `<section class="trip-main__trip-info  trip-info">
    ${createInfoTitleTemplate(data)}
    ${createInfoCostTemplate(data)}
  </section>`
);
