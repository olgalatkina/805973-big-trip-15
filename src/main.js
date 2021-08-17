import { createInfoTemplate } from './view/info';
import { createControlsTemplate } from './view/controls';
import { createMenuTemplate } from './view/menu';
import { createFiltersTemplate } from './view/filters';
import { createBtnTemplate } from './view/btn-new-event';
import { createSortTemplate } from './view/sort';
import { createEventsListTemplate } from './view/events-list';
import { createEventTemplate } from './view/event';
import { createEditEventTemplate } from './view/edit-event';
// import { createEmptyListTemplate } from './view/list-empty';
import { generateEvent } from './mock/event';
import { compareByStartTime } from './utils/date';
import {renderTemplate} from './utils/common';

const EVENT_COUNT = 15;
const data = new Array(EVENT_COUNT).fill().map(generateEvent).sort(compareByStartTime);
// console.log(data);

// HEADER
const siteHeaderElement = document.querySelector('.page-header');
const headerInfoElement = siteHeaderElement.querySelector('.trip-main');

renderTemplate(headerInfoElement, createInfoTemplate(data), 'afterbegin');

renderTemplate(headerInfoElement, createControlsTemplate(), 'beforeend');
const controls = headerInfoElement.querySelector('.trip-controls');
renderTemplate(controls, createMenuTemplate(), 'afterbegin');
renderTemplate(controls, createFiltersTemplate(), 'beforeend');

renderTemplate(headerInfoElement, createBtnTemplate(), 'beforeend');

//MAIN
const siteMainElement = document.querySelector('.page-main');
const content = siteMainElement.querySelector('.trip-events');

renderTemplate(content, createSortTemplate(), 'beforeend');

renderTemplate(content, createEventsListTemplate(), 'beforeend');
const eventsList = content.querySelector('.trip-events__list');


data.forEach((point, index) => index === 0
  ? renderTemplate(eventsList, createEditEventTemplate(point), 'beforeend')
  : renderTemplate(eventsList, createEventTemplate(point), 'beforeend'));
