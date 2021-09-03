import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { Types } from '../const';
import { getRandomInteger, shuffleArray } from '../utils/common';
import { DESTINATIONS, Destinations } from './dest';
import { OFFERS } from './offers';

export const POINTS = [{'base_price':500,'date_from':'2021-09-03T11:50:19.451Z','date_to':'2021-09-03T11:50:19.451Z','is_favorite':false,'type':'check-in','id':'24','offers':[{'title':'Choose the time of check-out','price':190},{'title':'Add breakfast','price':110},{'title':'Order a meal from the restaurant','price':30}],'destination':{'name':'Chamonix','description':'Chamonix, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East.','pictures':[{'src':'http://picsum.photos/300/200?r=0.45476391526901105','description':'Chamonix embankment'},{'src':'http://picsum.photos/300/200?r=0.566758784955685','description':'Chamonix city centre'},{'src':'http://picsum.photos/300/200?r=0.3594335201582288','description':'Chamonix city centre'},{'src':'http://picsum.photos/300/200?r=0.015965298341432232','description':'Chamonix kindergarten'},{'src':'http://picsum.photos/300/200?r=0.232413129206684','description':'Chamonix parliament building'}]},'icon':'img/icons/check-in.png','sightseeing':true,'restaurant':true,'train':true,'bus':true,'taxi':true,'check-in':true}];

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
