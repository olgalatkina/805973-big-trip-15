import { SortType, UserAction, UpdateType, FilterType } from '../const';
import { render, RenderPosition, remove } from '../utils/render';
import { compareByPrice, compareByStartTime, compareByDuration } from '../utils/common';
import { filter } from '../utils/date';
import TripView from '../view/trip';
import MessageView from '../view/message';
import SortView from '../view/sort';
import PointListView from '../view/point-list';
import PointPresenter from './point';
import PointNewPresenter from './point-new';

export default class Trip {
  constructor(bodyContainer, pointsModel, filterModel) {
    this._container = bodyContainer;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._filterType = FilterType.EVERYTHING;
    this._currentSortType = SortType.DAY;
    this._pointPresenters = new Map();


    this._tripComponent = new TripView();
    this._messageComponent = null;
    this._sortComponent = null;
    this._pointListComponent = new PointListView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointNewPresenter = new PointNewPresenter(this._pointListComponent, this._handleViewAction);
  }

  init() {
    render(this._container, this._tripComponent, RenderPosition.BEFOREEND);
    render(this._tripComponent, this._pointListComponent, RenderPosition.BEFOREEND);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderTrip();
  }

  destroy() {
    this._clearTrip({resetSortType: true});

    remove(this._pointListComponent);
    remove(this._tripComponent);

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createPoint(cb) {
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init(cb);
  }

  _getPoints() {
    this._filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[this._filterType](points);

    switch (this._currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(compareByStartTime);
      case SortType.TIME:
        return filteredPoints.sort(compareByDuration);
      case SortType.PRICE:
        return filteredPoints.sort(compareByPrice);
    }

    return filteredPoints;
  }

  _renderTrip() {
    if (!this._getPoints().length) {
      this._renderMessage();
      return;
    }
    this._renderSort();
    this._renderPointList();
  }

  _renderMessage() {
    this._messageComponent = new MessageView(this._filterType);
    render(this._tripComponent, this._messageComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointListComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenters.set(point.id, pointPresenter);
  }

  _renderPointList() {
    this._getPoints().forEach((point) => this._renderPoint(point));
  }

  _clearTrip({resetSortType = false} = {}) {
    this._pointNewPresenter.destroy();
    this._pointPresenters.forEach((presenter) => presenter.destroy());
    this._pointPresenters.clear();

    remove(this._sortComponent);

    if (this._messageComponent) {
      remove(this._messageComponent);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _handleViewAction(actionType, updateType, update) {
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch(updateType) {
      case UpdateType.PATCH:
        this._pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
    }
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    this._pointPresenters.forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();
  }
}
