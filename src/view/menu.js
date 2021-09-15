import AbstractView from './abstract';
import { MenuItem } from '../const';

const createMenuTemplate = () => (
  `<div class="trip-controls__navigation">
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-value="${MenuItem.TABLE}">${MenuItem.TABLE}</a>
      <a class="trip-tabs__btn" href="#" data-value="${MenuItem.STATS}">${MenuItem.STATS}</a>
    </nav>
  </div>`
);
export default class Menu extends AbstractView {
  constructor() {
    super();
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate();
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._setActiveMenuItem(evt.target);
    this._callback.menuClick(evt.target.dataset.value);
  }

  _setActiveMenuItem(menuItem) {
    const items = this.getElement().querySelectorAll('.trip-tabs__btn');
    items.forEach((item) => item.classList.remove('trip-tabs__btn--active'));
    menuItem.classList.add('trip-tabs__btn--active');
  }
}
