import InfoView from './view/info';
import ControlsView from './view/controls';
import MenuView from './view/menu';
import FiltersView from './view/filters';
import ButtonNewEventView from './view/btn-new-point';

import ContentView from './view/content';
import SortView from './view/sort';
import PointsListView from './view/points-list';
import PointView from './view/point';
import EditPointView from './view/edit-point';

import { generateEvent } from './mock/event';
import { compareByStartTime } from './utils/date';
import { render, RenderPosition} from './utils/common';

const EVENT_COUNT = 15;
const data = new Array(EVENT_COUNT).fill().map(generateEvent).sort(compareByStartTime);
// console.log(data);
// HEADER
const siteHeaderElement = document.querySelector('.page-header');
const headerMain = siteHeaderElement.querySelector('.trip-main');
render(headerMain, new InfoView(data).getElement(), RenderPosition.AFTERBEGIN);

const controls = new ControlsView().getElement();
render(headerMain, controls, RenderPosition.BEFOREEND);
render(controls, new MenuView().getElement(), RenderPosition.AFTERBEGIN);
render(controls, new FiltersView().getElement(), RenderPosition.BEFOREEND);
render(headerMain, new ButtonNewEventView().getElement(), RenderPosition.BEFOREEND);

//MAIN
const siteMainElement = document.querySelector('.page-main');
const bodyContainer = siteMainElement.querySelector('.page-body__container');

const content = new ContentView().getElement();
render(bodyContainer, content, RenderPosition.BEFOREEND);
render(content, new SortView().getElement(), RenderPosition.BEFOREEND);

const eventsList = new PointsListView().getElement();
render(content, eventsList, RenderPosition.BEFOREEND);

data.forEach((point, index) => index === 0
  ? render(eventsList, new EditPointView(point).getElement(), RenderPosition.BEFOREEND)
  : render(eventsList, new PointView(point).getElement(), RenderPosition.BEFOREEND));
