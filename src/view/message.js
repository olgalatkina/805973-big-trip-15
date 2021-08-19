import AbstractView from './abstract';

const createMessageTemplate = (message) => (
  `<p class="trip-events__msg">
    ${message}
  </p>`
);

export default class Message extends AbstractView {
  constructor(message) {
    super();
    this._message = message;
  }

  getTemplate() {
    return createMessageTemplate(this._message);
  }
}
