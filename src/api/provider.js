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
          this._store.setStoreItems(items, Sources.DESTINATIONS);
          return destinations;
        });
    }

    const storeDestinations = Object.values(this._store.getStoreItems(Sources.DESTINATIONS));

    return Promise.resolve(storeDestinations);
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          const items = createStoreStructure(offers, 'type');
          this._store.setStoreItems(items, Sources.OFFERS);
          return offers;
        });
    }

    const storeOffers = Object.values(this._store.getStoreItems(Sources.OFFERS));

    return Promise.resolve(storeOffers);
  }

  getPoints() {
    if (isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          const items = createStoreStructure(points.map(PointsModel.adaptToServer), 'id');
          this._store.setStoreItems(items, Sources.POINTS);
          return points;
        });
    }

    const storePoints = Object.values(this._store.getStoreItems(Sources.POINTS));

    return Promise.resolve(storePoints.map(PointsModel.adaptToClient));
  }

  updatePoint(point) {
    const storePoints = this._store.getStoreItems(Sources.POINTS);
    console.log(storePoints);
    storePoints[point.id] = PointsModel.adaptToServer(point);
    console.log(storePoints[point.id]);

    if (isOnline()) {
      console.log('---provider update---');
      return this._api.updatePoint(point)
        .then((updatedPoint) => {
          this._store.setStoreItems(storePoints, Sources.POINTS);
          // this._store.setStoreItem(updatedPoint.id, PointsModel.adaptToServer(updatedPoint));
          return updatedPoint;
        });
    }

    this._store.setStoreItems(storePoints, Sources.POINTS);
    // this._store.setStoreItem(point.id, PointsModel.adaptToServer({...point}));

    return Promise.resolve(point);
  }

  addPoint(point) {
    if (isOnline()) {
      console.log('---provider add---');
      return this._api.addPoint(point)
        .then((newPoint) => {
          console.log( newPoint);
          const storePoints = this._store.getStoreItems(Sources.POINTS);
          storePoints[newPoint.id] = PointsModel.adaptToServer(newPoint);
          this._store.setStoreItems(storePoints, Sources.POINTS);
          // this._store.setStoreItem(newPoint.id, PointsModel.adaptToServer(newPoint));
          return newPoint;
        });
    }

    return Promise.reject(new Error('Add point failed'));
  }

  deletePoint(point) {
    if (isOnline()) {
      console.log('---provider delete---');
      return this._api.deletePoint(point)
        .then(() => {
          const storePoints = this._store.getStoreItems(Sources.POINTS);
          console.log(storePoints);
          delete storePoints[point.id];
          console.log(storePoints);
          this._store.setStoreItems(storePoints, Sources.POINTS);
          // this._store.removeStoreItem(point.id);
        });
    }

    return Promise.reject(new Error('Delete point failed'));
  }

  sync() {
    console.log('---provider sync---');

    if (isOnline()) {
      const storePoints = Object.values(this._store.getStoreItems(Sources.POINTS));

      return this._api.sync(storePoints)
        .then((response) => {
          const createdPoints = getSyncedPoints(response.created);
          const updatedPoints = getSyncedPoints(response.updated);

          const items = createStoreStructure([...createdPoints, ...updatedPoints]);
          this._store.setStoreItems(items, Sources.POINTS);
        });
    }

    return Promise.reject(new Error('Sync data failed'));
  }
}
