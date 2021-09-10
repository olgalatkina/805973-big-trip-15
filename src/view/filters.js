import AbstractView from './abstract';

const createFilterTemplate =({type, name, count}, currentFilterType) => (
  `<div class="trip-filters__filter">
    <input
    id="filter-${name}"
    class="trip-filters__filter-input visually-hidden"
    type="radio"
    name="trip-filter"
    value="${name}"
    ${type === currentFilterType ? 'checked' : ''}
    ${count === 0 ? 'disabled' : ''}
  >
    <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
  </div>`
);

const createFiltersTemplate = (filters,  currentFilterType) => (
  `<div class="trip-controls__filters">
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      ${filters.map((filter) => createFilterTemplate(filter, currentFilterType)).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  </div>`
);

export default class Filters extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate(this._filters, this._currentFilterType);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }
}
