import { createInfoTemplate } from './view/info';
import { createControlsTemplate } from './view/controls';
import { createMenuTemplate } from './view/menu';
import { createFiltersTemplate } from './view/filters';
import { createBtnTemplate } from './view/btn-new-event';
import { createSortTemplate } from './view/sort';
import { createEventsListTemplate } from './view/events-list';
import { createEventTemplate } from './view/event';
import { createEditEventTemplate } from './view/edit-event';
// import { createNewEventTemplate } from './view/add-new-event';

import { generateEvent } from './mock/event';
import { compareByStartTime } from './utils/utils';

const EVENT_COUNT = 13;
const data = new Array(EVENT_COUNT).fill().map(generateEvent).sort(compareByStartTime);
// console.log(data);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// HEADER
const siteHeaderElement = document.querySelector('.page-header');
const headerInfoElement = siteHeaderElement.querySelector('.trip-main');

render(headerInfoElement, createInfoTemplate(data), 'afterbegin');

render(headerInfoElement, createControlsTemplate(), 'beforeend');
const controls = headerInfoElement.querySelector('.trip-controls');
render(controls, createMenuTemplate(), 'afterbegin');
render(controls, createFiltersTemplate(), 'beforeend');

render(headerInfoElement, createBtnTemplate(), 'beforeend');

//MAIN
const siteMainElement = document.querySelector('.page-main');
const content = siteMainElement.querySelector('.trip-events');

render(content, createSortTemplate(), 'beforeend');

render(content, createEventsListTemplate(), 'beforeend');
const eventsList = content.querySelector('.trip-events__list');

for (let i = 0; i <= data.length; i++) {
  i === 0 ? render(eventsList, createEditEventTemplate(), 'beforeend')
    : render(eventsList, createEventTemplate(data[i - 1]), 'beforeend');
}
