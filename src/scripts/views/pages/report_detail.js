
import Swal from 'sweetalert2';
import DisasterDBSource from '../../data/data-source';
import { badConnection, createDisasterDetailTemplate } from '../templates/template-creator';
import UrlParser from '../../routes/url-parser';
import reportReview from '../../utils/create-review';

const DetailReport = {
    async render() {
        return `
        <div id="report" class="report"></div>
        `;
    },
    async afterRender() {
      const url = UrlParser.parseActiveUrlWithOutCombiner();
      const reportContainer = document.querySelector('#report');
      try {
        Swal.fire({
          title: 'Get All Data...',
          text: 'Please wait while we process Data.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const reportData = await DisasterDBSource.detailReport(url.id);
        reportContainer.innerHTML = createDisasterDetailTemplate(reportData);
        console.log(reportData.data.report.latitude, reportData.data.report.longitude);
        var map = L.map('mapReport').setView([reportData.data.report.longitude,reportData.data.report.latitude], 13);

              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              }).addTo(map);

              L.marker([reportData.data.report.longitude,reportData.data.report.latitude]).addTo(map)
                  .bindPopup('Lokasi Bencana!')
                  .openPopup();
        Swal.close();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Something went wrong! \nError: ${error}`,
        });
      }



      const addReview = document.querySelector('#reviewForm');
      addReview.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const nameReview = addReview.querySelector('#name').value;
        const commentReview = addReview.querySelector('#comment').value;
        try {
          Swal.fire({
            title: 'Send Your Review...',
            text: 'Please wait while we send your review...',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          await reportReview(url, nameReview, commentReview);
          Swal.close();
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Something went wrong! \nError: ${error}`,
          });
        }
        addReview.querySelector('#name').value = '';
        addReview.querySelector('#comment').value = '';
      });
    },
}

export default DetailReport;

