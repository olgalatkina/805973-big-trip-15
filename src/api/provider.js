import PointsModel from '../model/points';
import {isOnline} from '../utils/common';
import { Sources } from '../const';

const getSyncedPoints = (items) =>
  items
    .filter(({success}) => success)
    .map(({payload}) => payload.point);

const createStoreStructure = (items, key) =>
  items
    .reduce((acc, current) => ({...acc, [current[key]]: current}), {});

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          const items = createStoreStructure(destinations, 'name');
          this._store.setItems(items, Sources.DESTINATIONS);
          return destinations;
        });
    }

    const storeDestinations = Object.values(this._store.getItems(Sources.DESTINATIONS));

    return Promise.resolve(storeDestinations);
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          const items = createStoreStructure(offers, 'type');
          this._store.setItems(items, Sources.OFFERS);
          return offers;
        });
    }

    const storeOffers = Object.values(this._store.getItems(Sources.OFFERS));

    return Promise.resolve(storeOffers);
  }

  getPoints() {
    if (isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          const items = createStoreStructure(points.map(PointsModel.adaptToServer), 'id');
          this._store.setItems(items, Sources.POINTS);
          return points;
        });
    }

    const storePoints = Object.values(this._store.getItems(Sources.POINTS));

    return Promise.resolve(storePoints.map(PointsModel.adaptToClient));
  }

  updatePoint(point) {
    const store = this._store.getItems();
    const points = store.points;
    points[point.id] = point;
    console.log(points[point.id]);

    if (isOnline()) {
      console.log('---provider update---');
      return this._api.updatePoint(point)
        .then((updatedPoint) => {
          this._store.setItem(updatedPoint.id, PointsModel.adaptToServer(updatedPoint));
          return updatedPoint;
        });
    }

    this._store.setItem(point.id, PointsModel.adaptToServer({...point}));

    return Promise.resolve(point);
  }

  addPoint(point) {
    if (isOnline()) {
      return this._api.addPoint(point)
        .then((newPoint) => {
          this._store.setItem(newPoint.id, PointsModel.adaptToServer(newPoint));
          return newPoint;
        });
    }

    return Promise.reject(new Error('Add point failed'));
  }

  deletePoint(point) {
    if (isOnline()) {
      return this._api.deletePoint(point)
        .then(() => this._store.removeItem(point.id));
    }

    return Promise.reject(new Error('Delete point failed'));
  }

  sync() {
    console.log('---provider sync---');

    if (isOnline()) {
      const storePoints = Object.values(this._store.getItems(Sources.POINTS));

      return this._api.sync(storePoints)
        .then((response) => {
          const createdPoints = getSyncedPoints(response.created);
          const updatedPoints = getSyncedPoints(response.updated);

          const items = createStoreStructure([...createdPoints, ...updatedPoints]);
          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error('Sync data failed'));
  }
}
