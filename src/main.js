import ControlsView from './view/controls';
import MenuView from './view/menu';
import FiltersView from './view/filters';
import ButtonNewEventView from './view/btn-new-point';
import InfoView from './view/info';
import TripPresenter from './presenter/trip';
import { generateEvent } from './mock/event';
import { render, RenderPosition } from './utils/render';

const EVENT_COUNT = 20;
const data = new Array(EVENT_COUNT).fill().map(generateEvent);

// HEADER
const siteHeaderElement = document.querySelector('.page-header');
const headerContainer = siteHeaderElement.querySelector('.trip-main');
const controls = new ControlsView();
render(headerContainer, controls, RenderPosition.BEFOREEND);
render(controls, new MenuView(), RenderPosition.AFTERBEGIN);
render(controls, new FiltersView(), RenderPosition.BEFOREEND);
render(headerContainer, new ButtonNewEventView(), RenderPosition.BEFOREEND);
data.length ? render(headerContainer, new InfoView(data), RenderPosition.AFTERBEGIN) : '';

//MAIN
const siteMainElement = document.querySelector('.page-main');
const bodyContainer = siteMainElement.querySelector('.page-body__container');
const tripPresenter = new TripPresenter(bodyContainer);
tripPresenter.init(data);
