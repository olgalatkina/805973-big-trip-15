import EditPointView from '../view/edit-point';
import { nanoid } from 'nanoid';
import { remove, render, RenderPosition } from '../utils/render';
import { UserAction, UpdateType } from '../const';

export default class PointNew {
  constructor(pointList, changeData) {
    this._pointListContainer = pointList;
    this._changeData = changeData;

    this._editPointComponent = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleRollUpClick = this._handleRollUpClick.bind(this);
    this._handleSubmitClick = this._handleSubmitClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init() {
    if (this._editPointComponent !== null) {
      return;
    }

    this._editPointComponent = new EditPointView();
    this._editPointComponent.setRollUpClickHandler(this._handleRollUpClick);
    this._editPointComponent.setSubmitClickHandler(this._handleSubmitClick);
    this._editPointComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._pointListContainer, this._editPointComponent, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._editPointComponent === null) {
      return;
    }

    remove(this._editPointComponent);
    this._editPointComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

  _handleSubmitClick(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {...point, id: nanoid()},
    );

    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _handleRollUpClick() {
    this.destroy();
  }
}
