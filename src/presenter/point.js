import PointView from '../view/point';
import EditPointView from '../view/edit-point';
import { render, RenderPosition, replace } from '../utils/render.js';

export default class Point {
  constructor(pointList) {
    this._pointListContainer = pointList;
    this._pointComponent = null;
    this._editPointComponent = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleRollDownClick = this._handleRollDownClick.bind(this);
    this._handleRollUpClick = this._handleRollUpClick.bind(this);
    this._handleSubmitClick = this._handleSubmitClick.bind(this);
  }

  init(point) {
    this.point = point;
    this._pointComponent = new PointView(point);
    this._editPointComponent = new EditPointView(point);

    this._pointComponent.setRollDownClickHandler(this._handleRollDownClick);
    this._editPointComponent.setRollUpClickHandler(this._handleRollUpClick);
    this._editPointComponent.setSubmitClickHandler(this._handleSubmitClick);

    render(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);
  }

  _replacePointToForm() {
    replace(this._editPointComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._editPointComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToPoint();
    }
  }

  _handleRollDownClick() {
    this._replacePointToForm();
  }

  _handleRollUpClick() {
    this._replaceFormToPoint();
  }

  _handleSubmitClick() {
    this._replaceFormToPoint();
  }
}
