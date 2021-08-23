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
    this._message = Messages.EVERYTHING;
    this._pointPresenters = new Map();

    this._tripComponent = new TripView();
    this._messageComponent = new MessageView(this._message);
    this._sortComponent = new SortView();
    this._pointListComponent = new PointListView();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handlePointChange = this._handlePointChange.bind(this);
  }

  init(userData) {
    this._userData = [...userData];
    console.log('userData: ' ,this._userData);
    render(this._container, this._tripComponent, RenderPosition.BEFOREEND);
    this._renderTrip();
  }

  _renderMessage() {
    render(this._tripComponent, this._messageComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    console.log('render sort');
    render(this._tripComponent, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenters.set(point.id, pointPresenter);
  }

  _renderPointList() {
    console.log('render point-list');
    render(this._tripComponent, this._pointListComponent, RenderPosition.BEFOREEND);
    this._userData.forEach((point) => this._renderPoint(point));
  }

  _clearPointList() {
    console.log('clear point-list');
    this._pointPresenters.forEach((presenter) => presenter.destroy());
    this._pointPresenters.clear();
  }

  _renderTrip() {
    if (!this._userData.length) {
      this._renderMessage();
      return;
    }
    this._renderSort();
    this._renderPointList();
  }

  _handlePointChange(updatedPoint) {
    this._userData = updatePoint(this._userData, updatedPoint);
    this._pointPresenters.get(updatedPoint.id).init(updatedPoint);
  }

  _handleModeChange() {
    this._pointPresenters.forEach((presenter) => presenter.resetView());
  }
}
