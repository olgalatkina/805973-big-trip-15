import TripView from '../view/trip.js';
import MessageView from '../view/message';
import SortView from '../view/sort';
import PointListView from '../view/point-list';
import PointPresenter from './point';
import { render, RenderPosition } from '../utils/render.js';
import { updatePoint } from '../utils/common';
import { Messages } from '../const';

export default class Trip {
  constructor(bodyContainer) {
    this._container = bodyContainer;
    this._pointPresenters = new Map();

    this._tripComponent = new TripView();
    this._messageComponent = new MessageView();
    this._sortComponent = new SortView();
    this._pointListComponent = new PointListView();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handlePointChange = this._handlePointChange.bind(this);
  }

  init(userData) {
    this._userData = [...userData];
    render(this._container, this._tripComponent, RenderPosition.BEFOREEND);
    this._renderBoard();
  }

  _handleModeChange() {
    this._pointPresenters.forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._userData = updatePoint(this._userData, updatedPoint);
    this._pointPresenters.get(updatedPoint.id).init(updatedPoint);
  }

  _renderMessage() {
    render(this._tripComponent, new MessageView(Messages.EVERYTHING), RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._tripComponent, new SortView(), RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenters.set(point.id, pointPresenter);
  }

  _clearPointList() {
    this._pointPresenters.forEach((presenter) => presenter.destroy());
    this._pointPresenters.clear();
  }

  _renderPointList() {
    render(this._tripComponent, this._pointListComponent, RenderPosition.BEFOREEND);
    this._userData.forEach((point) => this._renderPoint(point));
  }

  _renderBoard() {
    if (!this._userData.length) {
      this._renderMessage();
      return;
    }
    this._renderSort();
    this._renderPointList();
  }
}
