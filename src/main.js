import { createInfoTemplate } from './view/info';
// import InfoView from './view/info';
import ControlsView from './view/controls';
import MenuView from './view/menu';
import FiltersView from './view/filters';
import ButtonNewEventView from './view/btn-new-event';

import ContentView from './view/content';
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
const headerMain = siteHeaderElement.querySelector('.trip-main');
renderTemplate(headerMain, createInfoTemplate(data), RenderPosition.AFTERBEGIN);
// renderElement(headerMain, new InfoView().getElement(), RenderPosition.AFTERBEGIN);

const controls = new ControlsView().getElement();
renderElement(headerMain, controls, RenderPosition.BEFOREEND);
renderElement(controls, new MenuView().getElement(), RenderPosition.AFTERBEGIN);
renderElement(controls, new FiltersView().getElement(), RenderPosition.BEFOREEND);
renderElement(headerMain, new ButtonNewEventView().getElement(), RenderPosition.BEFOREEND);

//MAIN
const siteMainElement = document.querySelector('.page-main');
const bodyContainer = siteMainElement.querySelector('.page-body__container');

const content = new ContentView().getElement();
renderElement(bodyContainer, content, RenderPosition.BEFOREEND);
renderElement(content, new SortView().getElement(), RenderPosition.BEFOREEND);
renderElement(content, new EventsListView().getElement(), RenderPosition.BEFOREEND);

const eventsList = content.querySelector('.trip-events__list');

data.forEach((point, index) => index === 0
  ? renderTemplate(eventsList, createEditEventTemplate(point), RenderPosition.BEFOREEND)
  : renderTemplate(eventsList, createEventTemplate(point), RenderPosition.BEFOREEND));
