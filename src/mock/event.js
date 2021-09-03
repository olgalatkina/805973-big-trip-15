import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { Types } from '../const';
import { getRandomInteger, shuffleArray } from '../utils/common';
import { DESTINATIONS, Destinations } from './dest';
import { OFFERS } from './offers';

export const POINTS = [
  {
    'id':'26',
    'base_price':333,
    'date_from':'2021-09-06T09:00:00.000Z',
    'date_to':'2021-09-08T09:00:00.000Z',
    'destination':{
      'description':'Amsterdam, is a beautiful city, a true asian pearl, in a middle of Europe, with a beautiful old town, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East.',
      'name':'Amsterdam',
      'pictures':[
        {'src':'http://picsum.photos/300/200?r=0.47562367158941554','description':'Amsterdam city centre'},
        {'src':'http://picsum.photos/300/200?r=0.45796944178928234','description':'Amsterdam street market'},
        {'src':'http://picsum.photos/300/200?r=0.009175818727754637','description':'Amsterdam central station'},
        {'src':'http://picsum.photos/300/200?r=0.3425074151050318','description':'Amsterdam park'},
        {'src':'http://picsum.photos/300/200?r=0.4643195654902572','description':'Amsterdam city centre'},
        {'src':'http://picsum.photos/300/200?r=0.14996535405101508','description':'Amsterdam street market'},
        {'src':'http://picsum.photos/300/200?r=0.469185408474907','description':'Amsterdam park'},
        {'src':'http://picsum.photos/300/200?r=0.6732046547539619','description':'Amsterdam city centre'},
      ]},
    'is_favorite':false,
    'offers':[],
    'type':'bus',
  },{
    'id':'27',
    'base_price':333,
    'date_from':'2021-09-07T09:00:00.000Z',
    'date_to':'2021-09-09T09:00:00.000Z',
    'destination':{
      'description':'Geneva, with a beautiful old town.',
      'name':'Geneva',
      'pictures':[
        {'src':'http://picsum.photos/300/200?r=0.016608600208646296','description':'Geneva zoo'},
        {'src':'http://picsum.photos/300/200?r=0.5610019924835323','description':'Geneva street market'},
        {'src':'http://picsum.photos/300/200?r=0.27111597018091405','description':'Geneva parliament building'},
        {'src':'http://picsum.photos/300/200?r=0.18735026569560187','description':'Geneva embankment'},
        {'src':'http://picsum.photos/300/200?r=0.38990166933194303','description':'Geneva biggest supermarket'},
        {'src':'http://picsum.photos/300/200?r=0.18236379103343547','description':'Geneva biggest supermarket'},
      ]},
    'is_favorite':false,
    'offers':[],
    'type':'taxi',
  },{
    'base_price':500,
    'date_from':'2021-09-03T15:25:27.692Z',
    'date_to':'2021-09-03T15:25:27.692Z',
    'is_favorite':false,
    'type':'taxi',
    'id':'36',
    'offers':[
      {'title':'Choose the radio station','price':30},
    ],
    'destination':{
      'description':'Chamonix, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East.',
      'name':'Chamonix',
      'pictures':[
        {'src':'http://picsum.photos/300/200?r=0.45476391526901105','description':'Chamonix embankment'},
        {'src':'http://picsum.photos/300/200?r=0.566758784955685','description':'Chamonix city centre'},
        {'src':'http://picsum.photos/300/200?r=0.3594335201582288','description':'Chamonix city centre'},
        {'src':'http://picsum.photos/300/200?r=0.015965298341432232','description':'Chamonix kindergarten'},
        {'src':'http://picsum.photos/300/200?r=0.232413129206684','description':'Chamonix parliament building'},
      ],
    },
  },{
    'type': 'taxi',
    'offers': [
      {'title': 'Choose the radio station','price': 30},
      {'title': 'Drive slowly','price': 110},
    ],
    'destination': {
      'name': 'Chamonix',
      'description': 'Chamonix, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East.',
      'pictures': [
        {'src': 'http://picsum.photos/300/200?r=0.45476391526901105','description': 'Chamonix embankment'},
        {'src': 'http://picsum.photos/300/200?r=0.566758784955685','description': 'Chamonix city centre'},
        {'src': 'http://picsum.photos/300/200?r=0.3594335201582288','description': 'Chamonix city centre'},
        {'src': 'http://picsum.photos/300/200?r=0.015965298341432232','description': 'Chamonix kindergarten'},
        {'src': 'http://picsum.photos/300/200?r=0.232413129206684','description': 'Chamonix parliament building'},
      ],
    },
    'hasCityName': true,
    'id': '37',
    'basePrice': 55,
    'dateFrom': '2021-09-03T18:07:05.740Z',
    'dateTo': '2021-09-03T18:07:05.740Z',
    'isFavorite': false,
  },{
    'type': 'taxi',
    'offers': [
      {'title': 'Upgrade to a business class','price': 190},
      {'title': 'Drive quickly, I\'m in a hurry','price': 100},
    ],
    'destination': {
      'name': 'Chamonix',
      'description': 'Chamonix, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East.',
      'pictures': [
        {'src': 'http://picsum.photos/300/200?r=0.45476391526901105','description': 'Chamonix embankment'},
        {'src': 'http://picsum.photos/300/200?r=0.566758784955685','description': 'Chamonix city centre'},
        {'src': 'http://picsum.photos/300/200?r=0.3594335201582288','description': 'Chamonix city centre'},
        {'src': 'http://picsum.photos/300/200?r=0.015965298341432232','description': 'Chamonix kindergarten'},
        {'src': 'http://picsum.photos/300/200?r=0.232413129206684','description': 'Chamonix parliament building'},
      ],
    },
    'id': '45',
    'basePrice': 500,
    'dateFrom': '2021-09-03T18:36:28.963Z',
    'dateTo': '2021-09-03T18:51:00.000Z',
    'isFavorite': false,
  },
];

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
