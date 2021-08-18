import { getDate, getEndingDate } from '../utils/date';
import { getInfoTitle, getTotalPrice, createElement } from '../utils/common';

const createInfoTitleTemplate = (points) => (
  `<div class="trip-info__main">
    <h1 class="trip-info__title">${getInfoTitle(points)}</h1>
    <p class="trip-info__dates">${getDate(points[0].dateFrom)}&nbsp;&mdash;&nbsp;${getEndingDate(points)}</p>
  </div>`
);

const createInfoCostTemplate = (points) => (
  `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice(points)}</span>
  </p>`
);

const createInfoTemplate = (points) => (
  `<section class="trip-main__trip-info  trip-info">
    ${createInfoTitleTemplate(points)}
    ${createInfoCostTemplate(points)}
  </section>`
);

export default class Info {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createInfoTemplate(this._points);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
