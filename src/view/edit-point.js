import { nanoid } from 'nanoid';
import { formatDate, getActualDate } from '../utils/date';
import { Types, Destinations } from '../const';
import { OFFERS } from '../mock/offers';
import { getOffersByType } from '../utils/common';
import AbstractView from './abstract';

const BLANK_POINT = {
  type: Types.FLIGHT,
  destination: {
    name: '',
    description: '',
    pictures: [],
  },
  offers: getOffersByType('flight', OFFERS),
  dateFrom: getActualDate(),
  dateTo: getActualDate(),
  basePrice: 0,
  isFavorite: false,
  id: nanoid(),
};

const createIconList = (type, types) => (
  Object.values(types).map((eventType, index) => {
    const currentType = eventType.toLowerCase();
    const isTypeChecked = currentType === type;

    return `<div class="event__type-item">
        <input id="event-type-${currentType}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${currentType}" ${isTypeChecked ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${currentType}" for="event-type-${currentType}-${index}">${eventType}</label>
      </div>`;
  }).join('')
);

const createOptionTemplate = (city) => `<option value="${city}"></option>`;
const createDestinationsTemplate = () => Object.values(Destinations).map(createOptionTemplate).join('');

const createOffersContainerTemplate = (type, offers) => {
  const allOffers = getOffersByType(type, OFFERS);
  const isOffers = Boolean(allOffers.length);

  const createOfferTemplate = () => (
    allOffers.map((offer, idx) => {
      const isOfferSelected = offers.some((userOffer) => offer.title === userOffer.title);
      return `
      <div class="event__offer-selector">
        <input
          class="event__offer-checkbox visually-hidden"
          id="event-offer-${idx}"
          type="checkbox"
          name="event-offer-${idx}"
          ${isOfferSelected ? 'checked' : ''}
        >
        <label class="event__offer-label" for="event-offer-${idx}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`;
    }).join('')
  );

  return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers ${isOffers ? '' : 'visually-hidden'}">Offers</h3>
    <div class="event__available-offers">
      ${createOfferTemplate()}
    </div>
  </section>`;
};

const createPhotoTemplate = ({src}) => `<img class="event__photo" src="${src}" alt="Event photo">`;

const createPhotoContainerTemplate = ({pictures}) => (
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${pictures.map(createPhotoTemplate).join('')}
    </div>
  </div>`
);

const createEditPointTemplate = ({type, destination, dateFrom, dateTo, basePrice, offers }) => {
  const isDescription = Boolean(destination.description);
  const isPictures = Boolean(destination.pictures.length);

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
              ${createIconList(type, Types)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${createDestinationsTemplate()}
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
        ${createOffersContainerTemplate(type, offers)}

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination ${isDescription || isPictures ? '' : 'visually-hidden'}">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>
          ${isPictures ? createPhotoContainerTemplate(destination) : ''}
        </section>
      </section>
    </form>
  </li>`;
};

export default class EditPoint extends AbstractView {
  constructor(point = BLANK_POINT) {
    super();
    this._point = point;
    this._rollUpClickHandler = this._rollUpClickHandler.bind(this);
    this._submitClickHandler = this._submitClickHandler.bind(this);
  }

  getTemplate() {
    return createEditPointTemplate(this._point);
  }

  _rollUpClickHandler(evt) {
    evt.preventDefault();
    this._callback.rollUpClick();
  }

  setRollUpClickHandler(callback) {
    this._callback.rollUpClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._rollUpClickHandler);
  }

  _submitClickHandler(evt) {
    evt.preventDefault();
    this._callback.submitClick(this._point);
  }

  setSubmitClickHandler(callback) {
    this._callback.submitClick = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._submitClickHandler);
  }

  // static parsePointToState(point) {
  //   return Object.assign(
  //     {},
  //     point,
  //     {
  //       isDescription: Boolean(point.destination.description),
  //       isPictures: Boolean(point.destination.pictures.length),
  //       isOffers: Boolean(getOffersByType(point.type, OFFERS).length),
  //     });
  // }

  // static parseStateToPoint(state) {
  //   state = Object.assign({}, state);
  //   delete state.isDescription;
  //   delete state.isPictures;
  //   delete state.isOffers;

  //   return state;
  // }

  static parsePointToState(point) {
    return Object.assign({}, point);
  }

  static parseStateToPoint(state) {
    state = Object.assign({}, state);
    return state;
  }
}
