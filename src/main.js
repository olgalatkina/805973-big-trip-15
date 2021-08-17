import { createInfoTemplate } from './view/info';
import ControlsView from './view/controls';
import MenuView from './view/menu';
import FiltersView from './view/filters';
import ButtonNewEventView from './view/btn-new-event';
import SortView from './view/sort';
import EventsListView from './view/events-list';
import { createEventTemplate } from './view/event';
import { createEditEventTemplate } from './view/edit-event';

import { generateEvent } from './mock/event';
import { compareByStartTime } from './utils/date';
import {renderTemplate, renderElement, RenderPosition} from './utils/common';

const EVENT_COUNT = 15;
const data = new Array(EVENT_COUNT).fill().map(generateEvent).sort(compareByStartTime);
// HEADER
const siteHeaderElement = document.querySelector('.page-header');
const headerInfoElement = siteHeaderElement.querySelector('.trip-main');
renderTemplate(headerInfoElement, createInfoTemplate(data), RenderPosition.AFTERBEGIN);
renderElement(headerInfoElement, new ControlsView().getElement(), RenderPosition.BEFOREEND);
const controls = headerInfoElement.querySelector('.trip-controls');
renderElement(controls, new MenuView().getElement(), RenderPosition.AFTERBEGIN);
renderElement(controls, new FiltersView().getElement(), RenderPosition.BEFOREEND);
renderElement(headerInfoElement, new ButtonNewEventView().getElement(), RenderPosition.BEFOREEND);

//MAIN
const siteMainElement = document.querySelector('.page-main');
const content = siteMainElement.querySelector('.trip-events');
renderElement(content, new SortView().getElement(), RenderPosition.BEFOREEND);
renderElement(content, new EventsListView().getElement(), RenderPosition.BEFOREEND);
const eventsList = content.querySelector('.trip-events__list');

data.forEach((point, index) => index === 0
  ? renderTemplate(eventsList, createEditEventTemplate(point), RenderPosition.BEFOREEND)
  : renderTemplate(eventsList, createEventTemplate(point), RenderPosition.BEFOREEND));
