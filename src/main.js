
import { generateEvent } from './mock/event';
import { render, RenderPosition } from './utils/render';
import ControlsView from './view/controls';
import MenuView from './view/menu';
import ButtonNewEventView from './view/btn-new-point';
import InfoView from './view/info';
import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import PointsModel from './model/points';
import FilterModel from './model/filter';

const EVENT_COUNT = 20;
const data = new Array(EVENT_COUNT).fill().map(generateEvent);

const pointsModel = new PointsModel();
pointsModel.setPoints(data);

const filterModel = new FilterModel();

// HEADER
const siteHeaderElement = document.querySelector('.page-header');
const headerContainer = siteHeaderElement.querySelector('.trip-main');
const controls = new ControlsView();
render(headerContainer, controls, RenderPosition.BEFOREEND);
render(controls, new MenuView(), RenderPosition.AFTERBEGIN);

const filterPresenter = new FilterPresenter(controls, filterModel, pointsModel);
filterPresenter.init();

render(headerContainer, new ButtonNewEventView(), RenderPosition.BEFOREEND);
data.length ? render(headerContainer, new InfoView(data), RenderPosition.AFTERBEGIN) : '';

//MAIN
const siteMainElement = document.querySelector('.page-main');
const bodyContainer = siteMainElement.querySelector('.page-body__container');
const tripPresenter = new TripPresenter(bodyContainer, pointsModel, filterModel);
tripPresenter.init();
