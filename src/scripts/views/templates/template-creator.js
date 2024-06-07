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

const popupForm = () => `
<div id="popupForm" class="popup-form">
            <div class="popup-content">
                <span class="close-button" id="closeFormButton">&times;</span>
                <h2>Buat pertanyaan baru</h2>
                <form id="questionForm">
                    <label for="userName">Deskripsi Pertanyaan</label>
                    <input type="text" id="userName" name="userName" placeholder="Silahkan tulis judul pertanyaan..." required>
                    <label for="content">Judul Pertanyaan</label>
                    <textarea id="content" name="content" placeholder="Ketik sesuatu disini..." required></textarea>
                    <button type="submit">Buat Pertanyaan</button>
                </form>
            </div>
        </div>
`;


export {
    createDisasterDetailTemplate,
    badConnection,
    emptyData,
    popupForm
};

