import { Messages, SortType } from '../const';
import { render, RenderPosition } from '../utils/render.js';
import { compareByPrice, compareByStartTime, compareByDuration } from '../utils/common';
import TripView from '../view/trip.js';
import MessageView from '../view/message';
import SortView from '../view/sort';
import PointListView from '../view/point-list';
import PointPresenter from './point';

export default class Trip {
  constructor(bodyContainer, pointsModel) {
    this._container = bodyContainer;
    this._pointsModel = pointsModel;
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

  init() {
    render(this._container, this._tripComponent, RenderPosition.BEFOREEND);
    this._renderTrip();
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortType.DAY:
        return this._pointsModel.getPoints().slice().sort(compareByStartTime);
      case SortType.TIME:
        return this._pointsModel.getPoints().slice().sort(compareByDuration);
      case SortType.PRICE:
        return this._pointsModel.getPoints().slice().sort(compareByPrice);
    }

    return this._pointsModel.getPoints();
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
    render(this._tripComponent, this._messageComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._tripComponent, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point); // есть ли id в данных с сервера?
    this._pointPresenters.set(point.id, pointPresenter);
  }

  _renderPointList() {
    render(this._tripComponent, this._pointListComponent, RenderPosition.BEFOREEND);
    this._getPoints().forEach((point) => this._renderPoint(point));
  }

  _clearPointList() {
    this._pointPresenters.forEach((presenter) => presenter.destroy());
    this._pointPresenters.clear();
  }

  _handlePointChange(updatedPoint) {
    // обновление модели
    this._pointPresenters.get(updatedPoint.id).init(updatedPoint);
  }

  _handleModeChange() {
    this._pointPresenters.forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearPointList();
    this._renderPointList();
  }
}
