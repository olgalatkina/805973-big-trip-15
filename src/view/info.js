import { getDate, getEndingDate } from '../utils/date';
import { getInfoTitle, getTotalPrice } from '../utils/common';
import AbstractView from './abstract';

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

export default class Info extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createInfoTemplate(this._points);
  }
}
