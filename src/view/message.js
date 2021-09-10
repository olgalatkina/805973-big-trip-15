import AbstractView from './abstract';
import { FilterType } from '../const';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

const createMessageTemplate = (filterType) => {
  const message = NoPointsTextType[filterType];

  return (
    `<p class="trip-events__msg">
      ${message}
    </p>`);
};

export default class Message extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createMessageTemplate(this._data);
  }
}
