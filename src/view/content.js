import AbstractView from './abstract';

const contentTemplate = () => (
  `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>

  </section>`
);

export default class Content extends AbstractView {
  getTemplate() {
    return contentTemplate();
  }
}
