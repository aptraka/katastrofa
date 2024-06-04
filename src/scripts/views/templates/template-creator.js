import CONFIG from "../../globals/config";

const createDisasterDetailTemplate = (detail) => `
<div class="container">
  <h2 class="disaster__title">${detail.disaster.name}</h2>
  <p class="date">📅<span class="disaster__date">${detail.disaster.incident_time}</span></p>
  <img class="disaster__poster" src="${CONFIG.BASE_IMAGE_URL + detail.disaster.pictureId}" alt="${detail.disaster.name} Photo" />
  <div class="disaster__info">
    <h3>Information</h3>
    <div class="info__section">
      <h4>Location</h4>
      <p>${detail.disaster.location}</p>
    </div>
    <div class="info__section">
      <h4>Description</h4>
      <p>${detail.disaster.description}</p>
    </div>
  </div>
</div>
`;

const badConnection = () => `
<div class="bad-connection" id="badConnection">
  <p>Error, Refresh Page It looks like there might be a bad connection.</p>
</div>`;

const emptyData = () => `
<div class="empty-data" id="emptyData">
  <p>Data is empty.</p>
</div>
`;


export {
    createDisasterDetailTemplate,
    badConnection,
    emptyData
};