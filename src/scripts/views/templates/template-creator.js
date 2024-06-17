import CONFIG from "../../globals/config";

const createDisasterDetailTemplate = (detail) => `
<div class="container-detail">
        <div class="report">
            <h2>Detail Laporan</h2>
            <div class="report-item">
                <strong>Nama:</strong> ${detail.data.report.name}
            </div>
            <div class="report-item">
                <strong>Tipe Bencana:</strong> Banjir
            </div>
            <div class="report-item">
                <strong>Lokasi:</strong> Latitude: ${detail.data.report.latitude}, Longitude: ${detail.data.report.longitude}
            </div>
            <div class="report-item">
                <strong>Waktu Laporan:</strong> ${utcToWIB(detail.data.report.report_time)}
            </div>
            <div class="report-item">
                <strong>Deskripsi:</strong> ${detail.data.report.description}
            </div>
        </div>
        <div class="resto__overview">
          <h3>Komentar</h3>
          <div class="review__container">
              ${detail.data.dataComments.comments.map((comment) => `
              <div class="review__item">
                  <h5>${comment.nama} <span>(${utcToWIB(comment.createdAt)})</span></h5>
                  <p>${comment.komentar}</p>
              </div>
              `).join('')}
          </div>
        </div>
        <div class="review__form">
        <h3>Berikan Komentar</h3>
        <form id="reviewForm">
          <div class="form__section">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="write your name" required />
          </div>
          <div class="form__section">
            <label for="comment">Comment:</label>
            <textarea id="comment" name="comment" placeholder="write your review" required></textarea>
          </div>
          <div class="form__section">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
`;

const createReportItemtemplate = (data)=>`
<div class="discussion-item">
  <a href="/#/detail/${data.id}">
  <div class="discussion-header">
      <div class="user-info">
          <span class="user-name">${data.disaster_type}</span>
          <span class="post-time">${utcToWIB(data.report_time)}</span>
      </div>
  </div>
  <div class="discussion-content">
  <p>${data.description}</p>
  <p class="author">By ${data.name}</p>
  </div>
  </a>
</div>
`;
function utcToWIB(utcTimeStr) {
  const utcDate = new Date(utcTimeStr);

  const wibOffset = 7 * 60 * 60 * 1000;
  const wibDate = new Date(utcDate.getTime() + wibOffset);

  const year = wibDate.getFullYear();
  const month = String(wibDate.getMonth() + 1).padStart(2, '0');
  const day = String(wibDate.getDate()).padStart(2, '0');
  const hours = String(wibDate.getHours()).padStart(2, '0');
  const minutes = String(wibDate.getMinutes()).padStart(2, '0');
  const seconds = String(wibDate.getSeconds()).padStart(2, '0');

  const wibTimeStr = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} WIB`;
  return wibTimeStr;
}

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
    emptyData,
    createReportItemtemplate
};

