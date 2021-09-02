import InfoView from '../view/info';
import { render, RenderPosition, replace, remove } from '../utils/render';
import { compareByStartTime } from '../utils/common';

export default class Info {
  constructor(infoContainer, pointsModel) {
    this._infoContainer = infoContainer;
    this._pointsModel = pointsModel;
    this._infoComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const points = this._getSortedPoints();

    if (points.length === 0) {
      return '';
    }

    const prevInfoComponent = this._infoComponent;

    this._infoComponent = new InfoView(points);

    if (prevInfoComponent === null) {
      render(this._infoContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._infoComponent, prevInfoComponent);
    remove(prevInfoComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _getSortedPoints() {
    return this._pointsModel.getPoints().slice().sort(compareByStartTime);
  }
}
