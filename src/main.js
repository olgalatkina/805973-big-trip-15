
import { generateEvent } from './mock/event';
import { render, RenderPosition } from './utils/render';
import { MenuItem } from './const';
import ControlsView from './view/controls';
import MenuView from './view/menu';
import ButtonNewEventView from './view/btn-new-point';
import InfoView from './view/info';
import StatisticsView from './view/stats';
import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import PointsModel from './model/points';
import FilterModel from './model/filter';

// import { calculateMoney, calculateType, calculateTime } from './utils/stats';

const EVENT_COUNT = 13;
const data = new Array(EVENT_COUNT).fill().map(generateEvent);
// console.log(data);
// console.log(calculateMoney(data));
// console.log(calculateType(data));
// console.log(calculateTime(data));

const pointsModel = new PointsModel();
pointsModel.setPoints(data);

const filterModel = new FilterModel();

// HEADER
const siteHeaderElement = document.querySelector('.page-header');
const headerContainer = siteHeaderElement.querySelector('.trip-main');
const controls = new ControlsView();
render(headerContainer, controls, RenderPosition.BEFOREEND);

const menuComponent = new MenuView();
render(controls, menuComponent, RenderPosition.AFTERBEGIN);

const filterPresenter = new FilterPresenter(controls, filterModel, pointsModel);
filterPresenter.init();

const btnNewEventComponent = new ButtonNewEventView();
render(headerContainer, btnNewEventComponent, RenderPosition.BEFOREEND);
data.length ? render(headerContainer, new InfoView(data), RenderPosition.AFTERBEGIN) : '';

//MAIN
const siteMainElement = document.querySelector('.page-main');
const bodyContainer = siteMainElement.querySelector('.page-body__container');
const tripPresenter = new TripPresenter(bodyContainer, pointsModel, filterModel);
tripPresenter.init();
render(siteMainElement, new StatisticsView(pointsModel.getPoints()), RenderPosition.BEFOREEND);

const handleEventNewFormClose = () => {
  btnNewEventComponent.getElement().disabled = false;
};

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint(handleEventNewFormClose);
  btnNewEventComponent.getElement().disabled = true;
});

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      // tripPresenter.destroy();
      tripPresenter.init();
      // Скрыть статистику
      menuComponent.setMenuItem(menuItem);
      btnNewEventComponent.getElement().disabled = false;
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      // Показать статистику
      menuComponent.setMenuItem(menuItem);
      btnNewEventComponent.getElement().disabled = true;
      break;
  }
};

menuComponent.setMenuClickHandler(handleSiteMenuClick);
