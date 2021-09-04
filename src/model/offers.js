import AbstractObserver from '../utils/abstract-observer';

export default class Offers extends AbstractObserver {
  constructor() {
    super();
    this._offers = [];
  }

  setOffers(offers) {
    this._offers = [...offers];
    this._notify();
  }

  getOffers() {
    return this._offers;
  }
}
