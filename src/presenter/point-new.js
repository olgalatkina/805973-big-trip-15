import EditPointView from '../view/edit-point';
import { remove, render, RenderPosition } from '../utils/render';
import { isOnline } from '../utils/common';
import { toast } from '../utils/toast';
import { UserAction, UpdateType } from '../const';

export default class PointNew {
  constructor(pointList, changeData, offersModel, destinationsModel) {
    this._pointListContainer = pointList;
    this._changeData = changeData;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;

    this._editPointComponent = null;
    this._destroyCallback = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleSubmitClick = this._handleSubmitClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init(callback) {
    if (!isOnline()) {
      toast('You can\'t create point offline');
      return;
    }

    this._destroyCallback = callback;

    if (this._editPointComponent !== null) {
      return;
    }

    const offers = this._offersModel.getOffers();
    const destinations = this._destinationsModel.getDestinations();

    this._editPointComponent = new EditPointView(offers, destinations);
    this._editPointComponent.setSubmitClickHandler(this._handleSubmitClick);
    this._editPointComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._pointListContainer, this._editPointComponent, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._editPointComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._editPointComponent);
    this._editPointComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  setSaving() {
    this._editPointComponent.updateState({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._editPointComponent.updateState({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this._editPointComponent.shake(resetFormState);
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
      point,
    );
  }

  _handleDeleteClick() {
    this.destroy();
  }
}
