import { MAX_NUMBER_OF_CITIES } from '../const';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

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
