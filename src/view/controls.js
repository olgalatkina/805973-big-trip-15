import { createElement } from '../utils/common';

const createControlsTemplate = () => (
  `<div class="trip-main__trip-controls  trip-controls">
  </div>`
);
export default class Controls {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createControlsTemplate();
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
