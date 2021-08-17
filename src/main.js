import InfoView from './view/info';
import ControlsView from './view/controls';
import MenuView from './view/menu';
import FiltersView from './view/filters';
import ButtonNewEventView from './view/btn-new-point';

import ContentView from './view/content';
import SortView from './view/sort';
import PointListView from './view/points-list';
import PointView from './view/point';
import EditPointView from './view/edit-point';

import { generateEvent } from './mock/event';
import { compareByStartTime } from './utils/date';
import { render, RenderPosition} from './utils/common';

const EVENT_COUNT = 15;
const data = new Array(EVENT_COUNT).fill().map(generateEvent).sort(compareByStartTime);
// console.log(data);

const renderPoint = (list, item) => {
  const pointComponent = new PointView(item).getElement();
  const editPointComponent = new EditPointView(item).getElement();

  const replacePointToForm = () => {
    list.replaceChild(editPointComponent, pointComponent);
  };

  const replaceFormToPoint = () => {
    list.replaceChild(pointComponent, editPointComponent);
  };

  pointComponent.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToForm();
  });

  editPointComponent.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToPoint();
  });

  editPointComponent.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
  });

  render(list, pointComponent, RenderPosition.BEFOREEND);
};

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

const pointList = new PointListView().getElement();
render(content, pointList, RenderPosition.BEFOREEND);

data.forEach((point) => renderPoint(pointList, point));
