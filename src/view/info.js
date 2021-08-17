import { getDate, getEndingDate } from '../utils/date';
import { getInfoTitle, getTotalPrice } from '../utils/common';

const createInfoTitleTemplate = (data) => (
  `<div class="trip-info__main">
    <h1 class="trip-info__title">${getInfoTitle(data)}</h1>
    <p class="trip-info__dates">${getDate(data[0].dateFrom)}&nbsp;&mdash;&nbsp;${getEndingDate(data)}</p>
  </div>`
);

const createInfoCostTemplate = (data) => (
  `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice(data)}</span>
  </p>`
);

export const createInfoTemplate = (data) => (
  data ? `<section class="trip-main__trip-info  trip-info">
    ${createInfoTitleTemplate(data)}
    ${createInfoCostTemplate(data)}
  </section>` : ''
);
