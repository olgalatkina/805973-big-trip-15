import ContentView from '../view/content.js';
import MessageView from '../view/message';
import SortView from '../view/sort';
import PointListView from '../view/point-list';
import PointView from '../view/point';
import EditPointView from '../view/edit-point';
import { render, RenderPosition, replace } from '../utils/render.js';
import { Messages } from '../const';

export default class Board {
  constructor(bodyContainer) {
    this._container = bodyContainer;
    this._contentComponent = new ContentView();
    this._messageComponent = new MessageView();
    this._sortComponent = new SortView();
    this._pointListComponent = new PointListView();
  }

  init(userData) {
    this._userData = [...userData];
    render(this._container, this._contentComponent, RenderPosition.BEFOREEND);
    this._renderBoard();
  }

  _renderMessage() {
    render(this._contentComponent, new MessageView(Messages.EVERYTHING), RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._contentComponent, new SortView(), RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    const pointComponent = new PointView(point);
    const editPointComponent = new EditPointView(point);

    const replacePointToForm = () => {
      replace(editPointComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, editPointComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setRollUpClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.setRollUpClickHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown',onEscKeyDown);
    });

    editPointComponent.setSubmitClickHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown',onEscKeyDown);
    });

    render(this._pointListComponent, pointComponent, RenderPosition.BEFOREEND);
  }

  _renderPointList() {
    render(this._contentComponent, this._pointListComponent, RenderPosition.BEFOREEND);
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
