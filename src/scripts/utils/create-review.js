/* eslint-disable import/no-extraneous-dependencies */
import Swal from 'sweetalert2';
import DisasterDBSource from '../data/data-source';

const reportReview = async (url, name, comment) => {
  const inputReview = {
    idReport: url.id,
    name:name,
    comment:comment,
  };

  const allReviewContainer = document.querySelector('.review__container');
  const date = new Date();
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const newReview = `
    <div class="review__item">
        <h5>${name} <span>(${date})</span></h5>
        <p>${comment}</p>
    </div>
    `;

  try {
    Swal.fire({
      title: 'Get All Reviews...',
      text: 'Please wait while we process all reviews.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    console.log(inputReview);
    await DisasterDBSource.addReview(inputReview);
    Swal.close();
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `Something went wrong! \nError: ${error}`,
    });
  }

  allReviewContainer.innerHTML += newReview;
};

export default reportReview;
