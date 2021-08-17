const createPhotoTemplate = ({src}) => `<img class="event__photo" src="${src}" alt="Event photo">`;

export const createPhotoContainerTemplate = ({pictures}) => {
  const photos = pictures.map(createPhotoTemplate).join('');

  return `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${photos}
    </div>
  </div>`;
};
