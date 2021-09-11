import AbstractView from './abstract';
import { SortType } from '../const';

const createSortItemTemplate = (type, currentSortType) => (
  `<div class="trip-sort__item  trip-sort__item--${type}">
    <input
    id="sort-${type}"
    class="trip-sort__input  visually-hidden"
    data-sort-type="${(type === SortType.EVENT || type === SortType.OFFERS) ? '' : SortType[type.toUpperCase()]}"
    type="radio" name="trip-sort"
    value="sort-${type}"
    ${SortType[type.toUpperCase()] === currentSortType  ? 'checked' : ''}
    ${(type === SortType.EVENT || type === SortType.OFFERS) ? 'disabled' : ''}>
    <label class="trip-sort__btn" for="sort-${type}">${type}</label>
  </div>`
);

const createSortTemplate = (currentSortType = SortType.DAY) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(SortType).map((type) => createSortItemTemplate(type, currentSortType)).join('')}
  </form>`
);

export default class Sort extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('change', this._sortTypeChangeHandler);
  }

  _sortTypeChangeHandler(evt) {
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}
