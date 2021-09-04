import AbstractObserver from '../utils/abstract-observer';

export default class Destinations extends AbstractObserver {
  constructor() {
    super();
    this._destinations = [];
  }

  setDestinations(destinations) {
    this._destinations = destinations;
    this._notify();
  }

  getDestinations() {
    return this._destinations;
  }
}
