import TripView from '../view/trip.js';
import MessageView from '../view/message';
import SortView from '../view/sort';
import PointListView from '../view/point-list';
import PointPresenter from './point';
import { render, RenderPosition } from '../utils/render.js';
import { updatePoint, compareByPrice } from '../utils/common';
import { compareByStartTime, compareByDuration } from '../utils/date.js';
import { Messages, SortType } from '../const';

export default class Trip {
  constructor(bodyContainer) {
    this._container = bodyContainer;
    this._message = Messages.EVERYTHING;
    this._pointPresenters = new Map();
    this._currentSortType = SortType.DAY;

    this._tripComponent = new TripView();
    this._messageComponent = new MessageView(this._message);
    this._sortComponent = new SortView();
    this._pointListComponent = new PointListView();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(userData) {
    this._userData = [...userData];
    this._sortPoints(this._currentSortType);
    // this._backupData = [...userData];
    render(this._container, this._tripComponent, RenderPosition.BEFOREEND);
    this._renderTrip();
  }

  _renderTrip() {
    if (!this._userData.length) {
      this._renderMessage();
      return;
    }
    this._renderSort();
    this._renderPointList();
  }

  _renderMessage() {
    render(this._tripComponent, this._messageComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._tripComponent, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenters.set(point.id, pointPresenter);
  }

  _renderPointList() {
    render(this._tripComponent, this._pointListComponent, RenderPosition.BEFOREEND);
    this._userData.forEach((point) => this._renderPoint(point));
  }

  _clearPointList() {
    this._pointPresenters.forEach((presenter) => presenter.destroy());
    this._pointPresenters.clear();
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this._userData.sort(compareByStartTime);
        break;
      case SortType.TIME:
        this._userData.sort(compareByDuration);
        break;
      case SortType.PRICE:
        this._userData.sort(compareByPrice);
        break;
      // default:
      //   this._userData = this._backupData.slice();
    }

    this._currentSortType = sortType;
  }

  _handlePointChange(updatedPoint) {
    this._userData = updatePoint(this._userData, updatedPoint);
    // this._backupData = updatePoint(this._backupData, updatedPoint);
    this._pointPresenters.get(updatedPoint.id).init(updatedPoint);
  }

  _handleModeChange() {
    this._pointPresenters.forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearPointList();
    this._renderPointList();
  }
}
