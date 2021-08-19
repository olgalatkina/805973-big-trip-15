// const newValue = `Пользователь ${Math.random().toFixed(3) * 1000}`;
// pic.src = `https://avatars.dicebear.com/api/bottts/${newValue.replace('/\s/g', '')}.svg`;

import { Types } from '../const';
import { getRandomInteger, shuffleArray } from '../utils/common';

const generateOffers = () => {
  const titles = [
    'Rent a car',
    'Add breakfast',
    'Lunch in city',
    'Add luggage',
    'Upgrade to a business class',
    'Order Uber',
    'Book tickets',
  ];

  // 'Switch to comfort',
  // 'Choose the radio station',
  // 'Add meal',
  // 'Choose seats',
  // 'Travel by train',
  // 'Add transfer',
  // 'Child seat',
  // 'Vegetarian food',

  const options = [];

  titles.forEach((title) => {
    options.push({
      title,
      price: getRandomInteger(1, 10) * 10,
    });
  });

  const res = [];
  const types = Object.values(Types).map((type) => type.toLowerCase());

  types.forEach((type) => {
    res.push({
      type,
      offers: shuffleArray([...options]).slice(0, getRandomInteger(0, options.length - 1)),
    });
  });

  return res;
};

export const OFFERS = generateOffers();
