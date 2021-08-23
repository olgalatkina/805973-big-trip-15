import AbstractView from './abstract';

const tripTemplate = () => (
  `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>

  </section>`
);

export default class Trip extends AbstractView {
  getTemplate() {
    return tripTemplate();
  }
}
