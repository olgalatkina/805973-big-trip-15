const createPhotoTemplate = (photo) => `<img class="event__photo" src="${photo.src}" alt="Event photo">`;

export const createPhotoContainerTemplate = (point) => {
  const pictures = point.pictures.map(createPhotoTemplate).join('');

  return `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${pictures}
    </div>
  </div>`;
};
