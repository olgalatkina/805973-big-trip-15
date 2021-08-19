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
import { render, RenderPosition, replace } from './utils/render';
import { Messages } from './const';

const EVENT_COUNT = 15;
const data = new Array(EVENT_COUNT).fill().map(generateEvent).sort(compareByStartTime);
// console.log(data);

const renderPoint = (list, item) => {
  const pointComponent = new PointView(item);
  const editPointComponent = new EditPointView(item);

  const replacePointToForm = () => {
    replace(editPointComponent, pointComponent);
  };

  const replaceFormToPoint = () => {
    replace(pointComponent, editPointComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.setRollUpClickHandler(() => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  editPointComponent.setRollUpClickHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown',onEscKeyDown);
  });

  editPointComponent.setSubmitClickHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown',onEscKeyDown);
  });

  render(list, pointComponent, RenderPosition.BEFOREEND);
};

// HEADER
const siteHeaderElement = document.querySelector('.page-header');
const headerMain = siteHeaderElement.querySelector('.trip-main');
const controls = new ControlsView();
render(headerMain, controls, RenderPosition.BEFOREEND);
render(controls, new MenuView(), RenderPosition.AFTERBEGIN);
render(controls, new FiltersView(), RenderPosition.BEFOREEND);
render(headerMain, new ButtonNewEventView(), RenderPosition.BEFOREEND);

//MAIN
const siteMainElement = document.querySelector('.page-main');
const bodyContainer = siteMainElement.querySelector('.page-body__container');
const content = new ContentView();
render(bodyContainer, content, RenderPosition.BEFOREEND);

const renderData = () => {
  if (!data.length) {
    render(content, new MessageView(Messages.EVERYTHING), RenderPosition.BEFOREEND);
    return;
  }
  render(headerMain, new InfoView(data), RenderPosition.AFTERBEGIN);
  render(content, new SortView(), RenderPosition.BEFOREEND);
  const pointList = new PointListView();
  render(content, pointList, RenderPosition.BEFOREEND);
  data.forEach((point) => renderPoint(pointList, point));
};

renderData();
