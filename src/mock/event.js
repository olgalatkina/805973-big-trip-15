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
  },[{'id':'8','type':'drive','date_from':'2021-09-05T12:22:57.260Z','date_to':'2021-09-06T04:49:15.453Z','destination':{'name':'Oslo','description':'Oslo, a true asian pearl, with crowded streets, with a beautiful old town, middle-eastern paradise.','pictures':[{'src':'http://picsum.photos/300/200?r=0.35673191346309907','description':'Oslo parliament building'},{'src':'http://picsum.photos/300/200?r=0.65076090244652','description':'Oslo park'},{'src':'http://picsum.photos/300/200?r=0.37283414418203864','description':'Oslo biggest supermarket'},{'src':'http://picsum.photos/300/200?r=0.9129493039555434','description':'Oslo city centre'},{'src':'http://picsum.photos/300/200?r=0.016569509531049853','description':'Oslo embankment'},{'src':'http://picsum.photos/300/200?r=0.14028461280270488','description':'Oslo biggest supermarket'}]},'base_price':600,'is_favorite':false,'offers':[{'title':'Choose comfort class','price':110}]},{'id':'9','type':'ship','date_from':'2021-09-06T04:49:15.453Z','date_to':'2021-09-06T09:28:00.000Z','destination':{'name':'Kopenhagen','description':'Kopenhagen, famous for its crowded street markets with the best street food in Asia.','pictures':[{'src':'http://picsum.photos/300/200?r=0.282762187254469','description':'Kopenhagen central station'},{'src':'http://picsum.photos/300/200?r=0.6962652373213538','description':'Kopenhagen park'},{'src':'http://picsum.photos/300/200?r=0.7992112694859701','description':'Kopenhagen embankment'},{'src':'http://picsum.photos/300/200?r=0.7161935176456939','description':'Kopenhagen embankment'},{'src':'http://picsum.photos/300/200?r=0.6210309785652481','description':'Kopenhagen embankment'},{'src':'http://picsum.photos/300/200?r=0.18961161225948198','description':'Kopenhagen zoo'},{'src':'http://picsum.photos/300/200?r=0.17808924704215667','description':'Kopenhagen park'}]},'base_price':1100,'is_favorite':false,'offers':[{'title':'Choose seats','price':160}]},{'id':'10','type':'train','date_from':'2021-09-06T09:28:49.209Z','date_to':'2021-09-07T02:17:49.159Z','destination':{'name':'Rotterdam','description':'Rotterdam, in a middle of Europe, with a beautiful old town, with an embankment of a mighty river as a centre of attraction.','pictures':[{'src':'http://picsum.photos/300/200?r=0.3455515187288041','description':'Rotterdam park'},{'src':'http://picsum.photos/300/200?r=0.07294916055884615','description':'Rotterdam embankment'},{'src':'http://picsum.photos/300/200?r=0.3021390607736745','description':'Rotterdam street market'},{'src':'http://picsum.photos/300/200?r=0.9823326857006862','description':'Rotterdam park'},{'src':'http://picsum.photos/300/200?r=0.39117167408113684','description':'Rotterdam parliament building'},{'src':'http://picsum.photos/300/200?r=0.03142144436027183','description':'Rotterdam kindergarten'}]},'base_price':500,'is_favorite':true,'offers':[{'title':'Book a taxi at the arrival point','price':110},{'title':'Order a breakfast','price':80},{'title':'Wake up at a certain time','price':140}]},{'id':'11','type':'bus','date_from':'2021-09-07T02:17:49.159Z','date_to':'2021-09-07T08:34:47.527Z','destination':{'name':'Vien','description':'Vien, with crowded streets, for those who value comfort and coziness, famous for its crowded street markets with the best street food in Asia.','pictures':[{'src':'http://picsum.photos/300/200?r=0.8629476367284301','description':'Vien city centre'},{'src':'http://picsum.photos/300/200?r=0.6568829392717248','description':'Vien central station'},{'src':'http://picsum.photos/300/200?r=0.2810703762286304','description':'Vien biggest supermarket'},{'src':'http://picsum.photos/300/200?r=0.6676117449082541','description':'Vien central station'},{'src':'http://picsum.photos/300/200?r=0.10025252219652203','description':'Vien park'},{'src':'http://picsum.photos/300/200?r=0.4293747925655824','description':'Vien central station'}]},'base_price':900,'is_favorite':false,'offers':[{'title':'Infotainment system','price':50},{'title':'Order meal','price':100},{'title':'Choose seats','price':190}]},{'id':'12','type':'sightseeing','date_from':'2021-09-07T08:34:47.527Z','date_to':'2021-09-07T17:42:10.150Z','destination':{'name':'Amsterdam','description':'Amsterdam, with a beautiful old town, middle-eastern paradise, full of of cozy canteens where you can try the best coffee in the Middle East.','pictures':[{'src':'http://picsum.photos/300/200?r=0.6640052441931579','description':'Amsterdam kindergarten'},{'src':'http://picsum.photos/300/200?r=0.3404511538414543','description':'Amsterdam central station'},{'src':'http://picsum.photos/300/200?r=0.3635462382719201','description':'Amsterdam zoo'},{'src':'http://picsum.photos/300/200?r=0.9320239964017243','description':'Amsterdam street market'},{'src':'http://picsum.photos/300/200?r=0.8605286880058485','description':'Amsterdam street market'},{'src':'http://picsum.photos/300/200?r=0.12906359423742542','description':'Amsterdam zoo'},{'src':'http://picsum.photos/300/200?r=0.11075872703548972','description':'Amsterdam embankment'}]},'base_price':900,'is_favorite':true,'offers':[]},{'id':'13','type':'sightseeing','date_from':'2021-09-07T17:42:10.150Z','date_to':'2021-09-07T20:15:22.082Z','destination':{'name':'Milan','description':'Milan, is a beautiful city, in a middle of Europe, with a beautiful old town, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction.','pictures':[{'src':'http://picsum.photos/300/200?r=0.39353005011002273','description':'Milan kindergarten'},{'src':'http://picsum.photos/300/200?r=0.18593788043246473','description':'Milan city centre'},{'src':'http://picsum.photos/300/200?r=0.06663330406246026','description':'Milan street market'},{'src':'http://picsum.photos/300/200?r=0.7323914311580335','description':'Milan city centre'},{'src':'http://picsum.photos/300/200?r=0.7563156350192843','description':'Milan park'}]},'base_price':600,'is_favorite':false,'offers':[]},{'id':'14','type':'drive','date_from':'2021-09-07T20:15:22.082Z','date_to':'2021-09-08T14:58:29.142Z','destination':{'name':'Rome','description':'Rome, is a beautiful city, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, a perfect place to stay with a family.','pictures':[{'src':'http://picsum.photos/300/200?r=0.745828563198293','description':'Rome biggest supermarket'},{'src':'http://picsum.photos/300/200?r=0.7617959444295108','description':'Rome street market'},{'src':'http://picsum.photos/300/200?r=0.56609020891182','description':'Rome street market'},{'src':'http://picsum.photos/300/200?r=0.43977208528455103','description':'Rome city centre'},{'src':'http://picsum.photos/300/200?r=0.6973464583552944','description':'Rome street market'}]},'base_price':800,'is_favorite':false,'offers':[{'title':'Choose comfort class','price':110},{'title':'Choose business class','price':180}]},{'id':'15','type':'sightseeing','date_from':'2021-09-08T14:58:29.142Z','date_to':'2021-09-09T07:32:48.925Z','destination':{'name':'Munich','description':'Munich, is a beautiful city, with crowded streets, in a middle of Europe, with a beautiful old town, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction.','pictures':[{'src':'http://picsum.photos/300/200?r=0.47130970275768336','description':'Munich kindergarten'},{'src':'http://picsum.photos/300/200?r=0.17716896433094842','description':'Munich city centre'},{'src':'http://picsum.photos/300/200?r=0.6894006837379856','description':'Munich kindergarten'},{'src':'http://picsum.photos/300/200?r=0.34411891188446986','description':'Munich city centre'},{'src':'http://picsum.photos/300/200?r=0.1603292676401098','description':'Munich biggest supermarket'}]},'base_price':600,'is_favorite':true,'offers':[]},{'id':'16','type':'bus','date_from':'2021-09-09T07:32:48.925Z','date_to':'2021-09-10T06:06:38.519Z','destination':{'name':'Kioto','description':'Kioto, a true asian pearl, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction.','pictures':[{'src':'http://picsum.photos/300/200?r=0.19524462599805203','description':'Kioto biggest supermarket'},{'src':'http://picsum.photos/300/200?r=0.1167672453628299','description':'Kioto street market'},{'src':'http://picsum.photos/300/200?r=0.34797703311390515','description':'Kioto street market'},{'src':'http://picsum.photos/300/200?r=0.8595976840964512','description':'Kioto embankment'}]},'base_price':500,'is_favorite':true,'offers':[{'title':'Infotainment system','price':50},{'title':'Order meal','price':100},{'title':'Choose seats','price':190}]},{'id':'17','type':'taxi','date_from':'2021-09-10T06:06:38.519Z','date_to':'2021-09-10T20:28:20.781Z','destination':{'name':'Milan','description':'Milan, with crowded streets, with a beautiful old town, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction.','pictures':[{'src':'http://picsum.photos/300/200?r=0.3177024030381921','description':'Milan embankment'},{'src':'http://picsum.photos/300/200?r=0.3877070386114827','description':'Milan street market'},{'src':'http://picsum.photos/300/200?r=0.9693520945287422','description':'Milan embankment'},{'src':'http://picsum.photos/300/200?r=0.48680428213297455','description':'Milan parliament building'},{'src':'http://picsum.photos/300/200?r=0.6708135812839566','description':'Milan city centre'}]},'base_price':600,'is_favorite':true,'offers':[{'title':'Upgrade to a business class','price':190},{'title':'Choose temperature','price':170},{'title':'Drive slowly','price':110}]},{'id':'18','type':'train','date_from':'2021-09-10T20:28:20.781Z','date_to':'2021-09-11T15:57:46.833Z','destination':{'name':'Geneva','description':'Geneva, middle-eastern paradise, a perfect place to stay with a family.','pictures':[{'src':'http://picsum.photos/300/200?r=0.5968651980536064','description':'Geneva zoo'},{'src':'http://picsum.photos/300/200?r=0.18051076369098884','description':'Geneva park'},{'src':'http://picsum.photos/300/200?r=0.7060415364045616','description':'Geneva central station'},{'src':'http://picsum.photos/300/200?r=0.6214160146578198','description':'Geneva city centre'},{'src':'http://picsum.photos/300/200?r=0.48630238818528615','description':'Geneva biggest supermarket'},{'src':'http://picsum.photos/300/200?r=0.15388802983435768','description':'Geneva park'}]},'base_price':600,'is_favorite':true,'offers':[{'title':'Book a taxi at the arrival point','price':110},{'title':'Order a breakfast','price':80},{'title':'Wake up at a certain time','price':140}]},{'id':'19','type':'sightseeing','date_from':'2021-09-11T15:57:46.833Z','date_to':'2021-09-12T03:04:25.803Z','destination':{'name':'Amsterdam','description':'Amsterdam, in a middle of Europe, with a beautiful old town.','pictures':[{'src':'http://picsum.photos/300/200?r=0.5902287656140619','description':'Amsterdam zoo'},{'src':'http://picsum.photos/300/200?r=0.9486732691573405','description':'Amsterdam street market'},{'src':'http://picsum.photos/300/200?r=0.7424338470192064','description':'Amsterdam central station'},{'src':'http://picsum.photos/300/200?r=0.6535250273507229','description':'Amsterdam embankment'}]},'base_price':400,'is_favorite':false,'offers':[]},{'base_price':333,'date_from':'2021-09-20T09:00:00.000Z','date_to':'2021-09-27T09:00:00.000Z','destination':{'description':'Amsterdam, is a beautiful city, a true asian pearl, in a middle of Europe, with a beautiful old town, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East.','name':'Amsterdam','pictures':[{'src':'http://picsum.photos/300/200?r=0.47562367158941554','description':'Amsterdam city centre'},{'src':'http://picsum.photos/300/200?r=0.45796944178928234','description':'Amsterdam street market'},{'src':'http://picsum.photos/300/200?r=0.009175818727754637','description':'Amsterdam central station'},{'src':'http://picsum.photos/300/200?r=0.3425074151050318','description':'Amsterdam park'},{'src':'http://picsum.photos/300/200?r=0.4643195654902572','description':'Amsterdam city centre'},{'src':'http://picsum.photos/300/200?r=0.14996535405101508','description':'Amsterdam street market'},{'src':'http://picsum.photos/300/200?r=0.469185408474907','description':'Amsterdam park'},{'src':'http://picsum.photos/300/200?r=0.6732046547539619','description':'Amsterdam city centre'}]},'is_favorite':false,'offers':[],'type':'taxi','id':'20'}]
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
