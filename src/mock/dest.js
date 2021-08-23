import { Destinations } from '../const';
import { getRandomInteger, shuffleArray } from '../utils/common';

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

  return shuffleArray([...descriptions]).slice(0, getRandomInteger(0, descriptions.length - 1)).join(' ');
};

const generatePictures = () => {
  const res = [];
  for (let i = 0; i < getRandomInteger(0, 6); i++) {
    res.push({
      src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
      description: 'temp',
    });
  }
  return res;
};

const generateDirections = () => Object.values(Destinations).map((name) => ({
  name,
  description: generateDescription(),
  pictures: generatePictures(),
}));

export const DESTINATIONS = generateDirections();
