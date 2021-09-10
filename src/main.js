import { render, RenderPosition, remove } from './utils/render';
import { toast } from './utils/toast';
import { MenuItem, UpdateType, VERSION } from './const';
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
import Api from './api/api';
import Store from './api/store';
import Provider from './api/provider';

const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';
const AUTHORIZATION = 'Basic dHJvbHlhOnF3ZXJUeV8xMjMu';
const STORE_PREFIX = 'bigtrip-localstorage';
const STORE_NAME = `${STORE_PREFIX}-${VERSION}`;

const apiServer = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const api = new Provider(apiServer, store);
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

// MAIN
const siteMainElement = document.querySelector('.page-main');
const bodyContainer = siteMainElement.querySelector('.page-body__container');
const tripPresenter = new TripPresenter(bodyContainer, pointsModel, filterModel, api, offersModel, destinationsModel);

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
      bodyContainer.classList.remove('no-after');
      filterPresenter.removeDisabled();
      btnNewEventComponent.getElement().disabled = false;
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      statisticsComponent = new StatisticsView(pointsModel.getPoints());
      render(bodyContainer, statisticsComponent, RenderPosition.BEFOREEND);
      bodyContainer.classList.add('no-after');
      filterPresenter.setDisabled();
      btnNewEventComponent.getElement().disabled = true;
      break;
  }
};

infoPresenter.init();
tripPresenter.init();

const initApp = () => {
  filterPresenter.init();
  btnNewEventComponent.getElement().disabled = false;
  render(controls, menuComponent, RenderPosition.AFTERBEGIN);
  menuComponent.setMenuClickHandler(handleSiteMenuClick);
};

api.getData()
  .then(([offers, dest, points]) => {
    offersModel.setOffers(offers);
    destinationsModel.setDestinations(dest);
    pointsModel.setPoints(UpdateType.INIT, points);
    initApp();
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
    initApp();
  });

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
});

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  btnNewEventComponent.getElement().disabled = false;
  siteHeaderElement.style.backgroundColor = '#078ff0';
  siteHeaderElement.style.backgroundImage = 'url("../img/header-bg.png")';
  toast(' ONLINE ');
  api.sync();
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
  siteHeaderElement.style.backgroundColor = '#006ED3';
  siteHeaderElement.style.backgroundImage = 'none';
  toast(' OFFLINE ');
});
