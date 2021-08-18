import { createElement } from '../utils/common';
import { Messages } from '../const';

const createEmptyListTemplate = () => (
  `<p class="trip-events__msg">
    ${Messages.EVERYTHING}
  </p>`
);

export default class EmptyList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEmptyListTemplate();
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
