import { formatDate } from '../utils/utils';
import { Types, Destinations } from '../const';

const createTypeItemTemplate = (eventType) => {
  const type = eventType.toLowerCase();

  return `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${eventType}</label>
  </div>`;
};

const createCheckedTypeItemTemplate = (eventType) => {
  const type = eventType.toLowerCase();

  return `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" checked>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${eventType}</label>
  </div>`;
};

const createOptionTemplate = (point) => `<option value="${point}"></option>`;

const createPhotoTemplate = (photo) => `<img class="event__photo" src="${photo.src}" alt="Event photo">`;

const createPhotoContainerTemplate = (point) => {
  const pictures = point.pictures.map(createPhotoTemplate).join('');

  return `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${pictures}
    </div>
  </div>`;
};

const createOfferTemplate = (offer) => (
  offer.isChecked ? `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
      <label class="event__offer-label" for="event-offer-comfort-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>` : `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort">
    <label class="event__offer-label" for="event-offer-comfort-1">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`
);

const createOffersContainerTemplate = (offers) => (
  offers ? `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${offers.map(createOfferTemplate).join('')}
    </div>
  </section>` : ''
);

export const createEditEventTemplate = (eventItem) => {
  const {type, destination, dateFrom, dateTo, basePrice, offers} = eventItem;

  const submenu = Object.values(Types).map((eventType) => eventType !== type
    ? createTypeItemTemplate(eventType)
    : createCheckedTypeItemTemplate(eventType)).join('');

  const destinations = Object.values(Destinations).map(createOptionTemplate).join('');
  // console.log(destinations);

  const photos = createPhotoContainerTemplate(destination);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${submenu}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinations}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(dateFrom)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(dateTo)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${createOffersContainerTemplate(offers)}

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>
          ${photos}
        </section>
      </section>
    </form>
  </li>`;
};
