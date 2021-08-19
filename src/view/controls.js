import AbstractView from './abstract';

const createControlsTemplate = () => (
  `<div class="trip-main__trip-controls  trip-controls">
  </div>`
);
export default class Controls extends AbstractView {
  getTemplate() {
    return createControlsTemplate();
  }
}
