
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
      const restoContainer = document.querySelector('#report');
      try {
        Swal.fire({
          title: 'Get All Data Resto...',
          text: 'Please wait while we process Restaurant Data.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const reportData = await DisasterDBSource.detailReport(url.id);
        console.log(reportData);
        restoContainer.innerHTML = createDisasterDetailTemplate(reportData);
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

