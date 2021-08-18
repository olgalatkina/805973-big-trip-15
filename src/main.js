import InfoView from './view/info';
import ControlsView from './view/controls';
import MenuView from './view/menu';
import FiltersView from './view/filters';
import ButtonNewEventView from './view/btn-new-point';
import ContentView from './view/content';
import SortView from './view/sort';
import PointListView from './view/point-list';
import PointView from './view/point';
import EditPointView from './view/edit-point';
import MessageView from './view/message';
import { generateEvent } from './mock/event';
import { compareByStartTime } from './utils/date';
import { render, RenderPosition} from './utils/common';
import { Messages } from './const';

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

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  editPointComponent.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToPoint();
    document.removeEventListener('keydown',onEscKeyDown);
  });

  editPointComponent.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
    document.removeEventListener('keydown',onEscKeyDown);
  });

  render(list, pointComponent, RenderPosition.BEFOREEND);
};

// HEADER
const siteHeaderElement = document.querySelector('.page-header');
const headerMain = siteHeaderElement.querySelector('.trip-main');
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

const renderData = () => {
  render(headerMain, new InfoView(data).getElement(), RenderPosition.AFTERBEGIN);
  render(content, new SortView().getElement(), RenderPosition.BEFOREEND);
  const pointList = new PointListView().getElement();
  render(content, pointList, RenderPosition.BEFOREEND);
  data.forEach((point) => renderPoint(pointList, point));
};

data.length ? renderData() : render(content, new MessageView(Messages.EVERYTHING).getElement(), RenderPosition.BEFOREEND);

// if (data.length === 0) {
//   render(content, new MessageView(Messages.EVERYTHING).getElement(), RenderPosition.BEFOREEND);
//   return;
// }

// render(headerMain, new InfoView(data).getElement(), RenderPosition.AFTERBEGIN);
// render(content, new SortView().getElement(), RenderPosition.BEFOREEND);
// const pointList = new PointListView().getElement();
// render(content, pointList, RenderPosition.BEFOREEND);
// data.forEach((point) => renderPoint(pointList, point));
