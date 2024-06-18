
import Swal from 'sweetalert2';
import DisasterDBSource from '../../data/data-source';
import { badConnection, createReportItemtemplate } from '../templates/template-creator';
import addNewReport from '../../utils/create-report';
const Report = {
    async render() {
        return `
        <div class="first-content">
            <h2>Forum Diskusi</h2>
            <h1>Informasi Terkini Mengenai Bencana Banjir di Jakarta</h1>
        </div>
        <div class="mainContent">
            <div class="aside">
                    <button id="openFormButton"  class="button-content">Berikan Informasi</button>
            </div>
            <div class="right-side">
                <div class="discussion" id="discussion-container">
                </div>
            </div>
        </div>
        
        <div id="offline"></div>
        `;
    },

    async afterRender() {
        const offlineContainer = document.querySelector('#offline');
        try {
            Swal.fire({
              title: 'Get All Data...',
              text: 'Please wait while we process Data.',
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading();
              },
            });
            const reports = await DisasterDBSource.getAllReports();
            console.log(reports.data.reports);
            const discussions = reports.data.reports;
            const discussionContainer = document.getElementById('discussion-container');

        discussions.forEach(discussion => {
            discussionContainer.innerHTML += createReportItemtemplate(discussion);
        });
            Swal.close();
          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Something went wrong! \nError: ${error}`,
            });
            offlineContainer.innerHTML = badConnection();
          }

        // popUpForm
        const openFormButton = document.getElementById('openFormButton');
       
        openFormButton.addEventListener('click', () => {
            Swal.fire({
                title: 'Buat pertanyaan baru',
                html: `
                    <div class="swal-content-container">
                        <label for="username">Nama Anda</label>
                        <input type="text" id="username" class="swal2-input" placeholder="Silahkan tulis nama anda..." required>
                        <label for="content">Berita/kronologi Banjir</label>
                        <textarea id="content" class="swal2-textarea" placeholder="Ketik sesuatu disini..." required></textarea>
                        <div id="swal-map"></div>
                        <input type="hidden" id="lat">
                        <input type="hidden" id="lng">
                    </div>
                `,
                focusConfirm: false,
                didOpen: () => {
                    const defaultPosition = { lat: -6.200000, lng: 106.816666 };

                    const savedPosition = localStorage.getItem('markerPositionLeaflet');
                    let initialLat, initialLng;

                    if (savedPosition) {
                        const { lat, lng } = JSON.parse(savedPosition);
                        initialLat = lat;
                        initialLng = lng;
                    } else {
                        initialLat = defaultPosition.lat;
                        initialLng = defaultPosition.lng;
                    }
                    const swalMap = L.map('swal-map').setView([initialLat, initialLng], 13);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(swalMap);

                    let marker = L.marker([initialLat, initialLng], { draggable: true }).addTo(swalMap);

                    marker.on('dragend', () => {
                        const position = marker.getLatLng();
                        document.getElementById('lat').value = position.lat;
                        document.getElementById('lng').value = position.lng;
                    });
                },
                preConfirm: () => {
                    const username = Swal.getPopup().querySelector('#username').value;
                    const content = Swal.getPopup().querySelector('#content').value;
                    const lat = Swal.getPopup().querySelector('#lat').value;
                    const lng = Swal.getPopup().querySelector('#lng').value;
                    if (!username || !content || !lat || !lng) {
                        Swal.showValidationMessage(`Please enter all fields`);
                    }
                    return { username: username, content: content, lat: lat, lng: lng };
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    console.log('Nama:', result.value.username);
                    console.log('Isi Konten:', result.value.content);
                    console.log('Latitude:', result.value.lat);
                    console.log('Longitude:', result.value.lng);
                    await addNewReport(result.value.username, result.value.content, result.value.lat, result.value.lng);
                }
            });
        });
    }
};

export default Report;