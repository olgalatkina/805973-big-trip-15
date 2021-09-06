import he from 'he';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import { Types, CALENDAR_SETTINGS } from '../const';
import { formatDate, getActualDate } from '../utils/date';
import { getDestination, getOffersByType, getIsDescription, getIsPictures, getIsOffers } from '../utils/common';
import SmartView from './smart';

const BLANK_POINT = {
  type: Types.FLIGHT.toLowerCase(),
  destination: {
    name: 'Chamonix',
    description: 'Chamonix, with crowded streets, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.',
    pictures: [
      {
        'src': 'http://picsum.photos/300/200?r=0.961477384126419',
        'description': 'Chamonix kindergarten',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.8186866271526865',
        'description': 'Chamonix parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.46713149742733173',
        'description': 'Chamonix central station',
      },
    ],
  },
  offers: [],
  dateFrom: getActualDate(),
  dateTo: getActualDate(),
  basePrice: 0,
  isFavorite: false,
};

const getFlagValue = (bool) => bool ? 'Deleting' : 'Delete';

const createIconList = (type, types, isDisabled) => (
  Object.values(types).map((eventType, index) => {
    const currentType = eventType.toLowerCase();
    const isTypeChecked = currentType === type;

    return `<div class="event__type-item">
        <input
          id="event-type-${currentType}-${index}"
          class="event__type-input  visually-hidden"
          type="radio" name="event-type"
          value="${currentType}"
          ${isTypeChecked ? 'checked' : ''}
          ${isDisabled ? 'disabled' : ''}
        >
        <label class="event__type-label  event__type-label--${currentType}" for="event-type-${currentType}-${index}">
          ${eventType}
        </label>
      </div>`;
  }).join('')
);

const createOptionTemplate = (city) => `<option value="${city}"></option>`;
const createDestinationsTemplate = (dest) => dest.map((item) => item.name).map(createOptionTemplate).join('');

const createOfferTemplate = (type, offers, OFFERS, isDisabled) => {
  const allOffers = getOffersByType(type, OFFERS);

  return allOffers.map((offer, idx) => {
    const isOfferSelected = offers.some((userOffer) => offer.title === userOffer.title);
    return `
    <div class="event__offer-selector">
      <input
        class="event__offer-checkbox visually-hidden"
        id="event-offer-${idx}"
        type="checkbox"
        name="event-offer-${idx}"
        ${isOfferSelected ? 'checked' : ''}
        data-title = "${offer.title}"
        data-price = "${offer.price}"
        ${isDisabled ? 'disabled' : ''}
      >
      <label class="event__offer-label" for="event-offer-${idx}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
  }).join('');
};

const createPhotoTemplate = ({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`;

const createPhotoContainerTemplate = ({pictures}) => (
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${pictures.map(createPhotoTemplate).join('')}
    </div>
  </div>`
);

const createEditPointTemplate = (OFFERS, DESTINATIONS, {
  type,
  destination,
  dateFrom,
  dateTo,
  basePrice,
  offers,
  isDescription,
  isPictures,
  isOffers,
  isDisabled,
  isSaving,
  isDeleting,
}, isEdit) => (
  `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input
            class="event__type-toggle
            visually-hidden"
            id="event-type-toggle-1"
            type="checkbox"
            ${isDisabled ? 'disabled' : ''}
          >

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
          <input
            class="event__input  event__input--destination"
            id="event-destination-1"
            type="text"
            name="event-destination"
            value="${he.encode(destination.name)}"
            list="destination-list-1"
            ${isDisabled ? 'disabled' : ''}
          >
          <datalist id="destination-list-1">
            ${createDestinationsTemplate(DESTINATIONS)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input
            class="event__input  event__input--time"
            id="event-start-time-1"
            type="text"
            name="event-start-time"
            value="${formatDate(dateFrom)}"
            ${isDisabled ? 'disabled' : ''}
          >
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input
            class="event__input  event__input--time"
            id="event-end-time-1"
            type="text"
            name="event-end-time"
            value="${formatDate(dateTo)}"
            ${isDisabled ? 'disabled' : ''}
          >
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input
            class="event__input  event__input--price"
            id="event-price-1"
            type="number"
            min="0"
            step="1"
            name="event-price"
            value="${basePrice}"
            ${isDisabled ? 'disabled' : ''}
          >
        </div>

        <button
          class="event__save-btn  btn  btn--blue"
          type="submit"
          ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}
        </button>
        <button
          class="event__reset-btn" type="reset"
          ${isDisabled ? 'disabled' : ''}>${isEdit ? getFlagValue(isDeleting) : 'Cancel'}
        </button>
        ${isEdit ? `<button
          class="event__rollup-btn"
          type="button"
          ${isDisabled ? 'disabled' : ''}><span class="visually-hidden">Open event</span>
        </button>` : ''}
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers ${isOffers ? '' : 'visually-hidden'}">Offers</h3>
          <div class="event__available-offers">
            ${createOfferTemplate(type, offers, OFFERS)}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination ${isDescription || isPictures ? '' : 'visually-hidden'}">Destination</h3>
          <p class="event__destination-description">${isDescription ? destination.description : ''}</p>
          ${isPictures ? createPhotoContainerTemplate(destination) : ''}
        </section>
      </section>
    </form>
  </li>`
);

export default class EditPoint extends SmartView {
  constructor(OFFERS, DESTINATIONS, point = BLANK_POINT, isEdit = false) {
    super();
    this._offers = OFFERS;
    this._destinations = DESTINATIONS;
    this._state = EditPoint.parsePointToState(point);
    this._isEdit = isEdit;
    this._datepickerStart = null;
    this._datepickerEnd = null;

    this._rollUpClickHandler = this._rollUpClickHandler.bind(this);
    this._submitClickHandler = this._submitClickHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._focusCitySelectionHandler = this._focusCitySelectionHandler.bind(this);
    this._changeCityHandler = this._changeCityHandler.bind(this);
    this._changeTypeHandler = this._changeTypeHandler.bind(this);
    this._changePriceHandler = this._changePriceHandler.bind(this);
    this._changeOffersHandler = this._changeOffersHandler.bind(this);

    this._timeFromHandler = this._timeFromHandler.bind(this);
    this._timeToHandler = this._timeToHandler.bind(this);
    this._setDatePicker = this._setDatePicker.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createEditPointTemplate(this._offers, this._destinations, this._state, this._isEdit);
  }

  reset(point) {
    this.updateState(
      EditPoint.parsePointToState(point),
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
    if (this._isEdit) {
      this.setRollUpClickHandler(this._callback.rollUpClick);
    }
    this.setSubmitClickHandler(this._callback.submitClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  removeElement() {
    super.removeElement();
    this._resetDatePicker();
  }

  _resetDatePicker() {
    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }
    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }
  }

  _setDatePicker() {
    this._resetDatePicker();

    this._datepickerStart = flatpickr(
      this.getElement().querySelector('[name = "event-start-time"]'),
      {
        ...CALENDAR_SETTINGS,
        onChange: this._timeFromHandler,
      },
    ),
    this._datepickerEnd = flatpickr(
      this.getElement().querySelector('[name = "event-end-time"]'),
      {
        ...CALENDAR_SETTINGS,
        minDate: this._datepickerStart.input.value,
        onChange: this._timeToHandler,
      },
    );
  }

  _timeFromHandler([userDate]) {
    this.updateState({
      dateFrom: userDate,
    }, true);
  }

  _timeToHandler([userDate]) {
    this.updateState({
      dateTo: userDate,
    }, true);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._changeCityHandler);
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._changeTypeHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('input', this._changePriceHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('focus', this._focusCitySelectionHandler);
    this.getElement().querySelector('.event__section--offers').addEventListener('change', this._changeOffersHandler);
    this._setDatePicker();
  }

  _focusCitySelectionHandler(evt) {
    evt.preventDefault();
    evt.target.value = '';
    this.getElement().querySelector('.event__section--destination').innerHTML = '';
  }

  _changeCityHandler(evt) {
    evt.preventDefault();
    this.updateState({
      destination: getDestination(evt.target.value, this._destinations),
      isDescription: getIsDescription(evt.target.value, this._destinations),
      isPictures: getIsPictures(evt.target.value, this._destinations),
    });
  }

  _changeTypeHandler(evt) {
    evt.preventDefault();
    this.updateState({
      type: evt.target.value,
      offers: [],
      isOffers: getIsOffers(evt.target.value, this._offers),
    });
  }

  _changePriceHandler(evt) {
    evt.preventDefault();
    this.updateState({basePrice: Number(evt.target.value)}, true);
  }

  _changeOffersHandler(evt) {
    const { price, title } = evt.target.dataset;
    this.updateState({
      offers: evt.target.checked
        ? [...this._state.offers, {title, price: Number(price)}]
        : [...this._state.offers.filter((offer) => offer.title !== title)],
    });
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
    this._callback.submitClick(EditPoint.parseStateToPoint(this._state));
  }

  setSubmitClickHandler(callback) {
    this._callback.submitClick = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._submitClickHandler);
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EditPoint.parseStateToPoint(this._state));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._deleteClickHandler);
  }

  static parsePointToState(point) {
    return {
      ...point,
      isDescription: Boolean(point.destination.description),
      isPictures: Boolean(point.destination.pictures.length),
      isOffers: Boolean(point.offers.length),
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    state = {...state};
    delete state.isDescription;
    delete state.isPictures;
    delete state.isOffers;
    delete state.isDisabled;
    delete state.isSaving;
    delete state.isDeleting;

    return state;
  }
}
