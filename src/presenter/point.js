import PointView from '../view/point';
import EditPointView from '../view/edit-point';
import { remove, render, RenderPosition, replace } from '../utils/render';
import { Mode, UserAction, UpdateType } from '../const';

export default class Point {
  constructor(pointList, changeData, changeMode) {
    this._pointListContainer = pointList;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._editPointComponent = null;
    this._mode = Mode.DEFAULT;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleRollDownClick = this._handleRollDownClick.bind(this);
    this._handleRollUpClick = this._handleRollUpClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleSubmitClick = this._handleSubmitClick.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevEditPointComponent = this._pointComponent;

    this._pointComponent = new PointView(point);
    this._editPointComponent = new EditPointView(point);

    this._pointComponent.setRollDownClickHandler(this._handleRollDownClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._editPointComponent.setRollUpClickHandler(this._handleRollUpClick);
    this._editPointComponent.setSubmitClickHandler(this._handleSubmitClick);

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._editPointComponent, prevEditPointComponent);
    }
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._editPointComponent);
  }

  _replacePointToForm() {
    replace(this._editPointComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._editPointComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._editPointComponent.reset(this._point);
      this._replaceFormToPoint();
    }
  }

  _handleRollDownClick() {
    this._replacePointToForm();
  }

  _handleRollUpClick() {
    this._editPointComponent.reset(this._point);
    this._replaceFormToPoint();
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this._point, isFavorite: !this._point.isFavorite},
    );
  }

  _handleSubmitClick(point) {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point,
    );
    this._replaceFormToPoint();
  }
}
