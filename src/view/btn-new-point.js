import Abstract from './abstract';

const createBtnTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class ButtonNewEvent extends Abstract {
  getTemplate() {
    return createBtnTemplate();
  }
}
