export const Types = {
  TAXI: 'Taxi',
  BUS: 'Bus',
  TRAIN: 'Train',
  SHIP: 'Ship',
  DRIVE: 'Drive',
  FLIGHT: 'Flight',
  CHECK_IN: 'Check-in',
  SIGHTSEEING: 'Sightseeing',
  RESTAURANT: 'Restaurant',
};

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const MenuItem = {
  TABLE: 'Table',
  STATS: 'Stats',
};

export const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export const Sources = {
  POINTS: 'points',
  OFFERS: 'offers',
  DESTINATIONS: 'destinations',
  SYNC: 'sync',
};

export const Background = {
  ONLINE_COLOR: '#078ff0',
  OFFLINE_COLOR: '#006ED3',
  ONLINE_IMAGE: 'url("../img/header-bg.png")',
  OFFLINE_IMAGE: 'none',
};

export const MAX_NUMBER_OF_CITIES = 3;

export const SHAKE_ANIMATION_TIMEOUT = 600;

export const CALENDAR_SETTINGS = {
  altInput: true,
  altFormat: 'd/m/y H:i',
  dateFormat: 'm/d/y H:i',
  enableTime: true,
  'time_24hr': true,
};

export const VERSION = 'v15';
