import Api from './api.js';
import { render, RenderPosition, remove } from './utils/render';
import { MenuItem, UpdateType } from './const';
import ControlsView from './view/controls';
import MenuView from './view/menu';
import ButtonNewEventView from './view/btn-new-point';
import StatisticsView from './view/stats';
import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import InfoPresenter from './presenter/info';
import PointsModel from './model/points';
import FilterModel from './model/filter';
import OffersModel from './model/offers';
import DestinationsModel from './model/destinations';

const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';
const AUTHORIZATION = 'Basic dHJvbHlhOnF3ZXJUeV8xMjMu';

const api = new Api(END_POINT, AUTHORIZATION);
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

// HEADER
const siteHeaderElement = document.querySelector('.page-header');
const headerContainer = siteHeaderElement.querySelector('.trip-main');
const controls = new ControlsView();
render(headerContainer, controls, RenderPosition.BEFOREEND);
const menuComponent = new MenuView();
const filterPresenter = new FilterPresenter(controls, filterModel, pointsModel);
const btnNewEventComponent = new ButtonNewEventView();
btnNewEventComponent.getElement().disabled = true;
render(headerContainer, btnNewEventComponent, RenderPosition.BEFOREEND);
const infoPresenter = new InfoPresenter(headerContainer, pointsModel);

//MAIN
const siteMainElement = document.querySelector('.page-main');
const bodyContainer = siteMainElement.querySelector('.page-body__container');
const tripPresenter = new TripPresenter(bodyContainer, pointsModel, filterModel, api);

const handleEventNewFormClose = () => {
  btnNewEventComponent.getElement().disabled = false;
};

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint(handleEventNewFormClose);
  btnNewEventComponent.getElement().disabled = true;
});

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      tripPresenter.destroy();
      tripPresenter.init();
      remove(statisticsComponent);
      filterPresenter.removeDisabled();
      btnNewEventComponent.getElement().disabled = false;
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      statisticsComponent = new StatisticsView(pointsModel.getPoints());
      render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      filterPresenter.setDisabled();
      btnNewEventComponent.getElement().disabled = true;
      break;
  }
};

infoPresenter.init();
tripPresenter.init();

api.getOffers().then((offers) => offersModel.setOffers(offers)).catch((err) => console.log(err));
api.getDestinations().then((dest) => destinationsModel.setDestinations(dest)).catch((err) => console.log(err));

api.getPoints()
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);
    filterPresenter.init();
    btnNewEventComponent.getElement().disabled = false;
    render(controls, menuComponent, RenderPosition.AFTERBEGIN);
    menuComponent.setMenuClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
    filterPresenter.init();
    btnNewEventComponent.getElement().disabled = false;
    render(controls, menuComponent, RenderPosition.AFTERBEGIN);
    menuComponent.setMenuClickHandler(handleSiteMenuClick);
  });
