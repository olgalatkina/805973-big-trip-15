import AbstractObserver from '../utils/abstract-observer';

export default class Points extends AbstractObserver {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(points) {
    this._points = [...points];
  }

  getPoints() {
    return this._points;
  }
}
