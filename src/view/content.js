import {createElement} from '../utils/common';

const contentTemplate = () => (
  `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>

  </section>`
);

export default class Content {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return contentTemplate();
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
