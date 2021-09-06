import AbstractView from './abstract';

const createMessageTemplate = () => (
  `<p class="trip-events__msg">
    Loading...
  </p>`
);


export default class Message extends AbstractView {
  getTemplate() {
    return createMessageTemplate();
  }
}
