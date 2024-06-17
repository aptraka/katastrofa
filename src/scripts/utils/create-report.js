/* eslint-disable import/no-extraneous-dependencies */
import Swal from 'sweetalert2';
import DisasterDBSource from '../data/data-source';

const addNewReport = async (name, review, long, lat) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const dateNow = new Date().toLocaleDateString('id-ID', options);
  const inputReview = {
    disasterTypeId: 1, 
    longitude:long, 
    latitude: lat, 
    incidentTime: dateNow, 
    description: review, 
    name: name
  };

  const discussionContainer = document.getElementById('discussion-container');
  

  function utcToWIB(utcDate) {
    const date = new Date(utcDate);
    date.setHours(date.getHours() + 7);
    return date.toLocaleDateString('id-ID', options); // Adjust options as needed
  }
  
  const newReport = `
  <div class="discussion-item">
    <a href="/#/detail/${inputReview.disasterTypeId}">
      <div class="discussion-header">
        <div class="user-info">
          <span class="user-name">${inputReview.name}</span>
          <span class="post-time">${utcToWIB(inputReview.incidentTime)}</span>
        </div>
      </div>
      <div class="discussion-content">
        <p>${inputReview.description}</p>
      </div>
    </a>
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
    const reportnow = await DisasterDBSource.addReport(inputReview);
    console.log(reportnow, inputReview);
    Swal.close();
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `Something went wrong! \nError: ${error}`,
    });
  }

  discussionContainer.innerHTML += newReport;
};

export default addNewReport;
