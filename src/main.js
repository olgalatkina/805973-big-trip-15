import { createInfoTemplate } from './view/info';
import { createInfoTitleTemplate } from './view/info-title';
import { createInfoCostTemplate } from './view/info-cost';
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

const data = [];
for (let i = 0; i < 20; i++) {
  const event = generateEvent();
  data.push(event);
}

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// HEADER
const siteHeaderElement = document.querySelector('.page-header');
const headerInfoElement = siteHeaderElement.querySelector('.trip-main');

render(headerInfoElement, createInfoTemplate(), 'afterbegin');

const eventInfo = headerInfoElement.querySelector('.trip-info');
render(eventInfo, createInfoTitleTemplate(), 'afterbegin');
render(eventInfo, createInfoCostTemplate(), 'beforeend');

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

for (let i = 0; i <= 3; i++) {
  i === 0 ? render(eventsList, createEditEventTemplate(), 'beforeend')
    : render(eventsList, createEventTemplate(), 'beforeend');
}
