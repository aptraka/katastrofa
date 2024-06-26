/* eslint-disable import/extensions */
import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import Swal from 'sweetalert2';
import '../styles/responsive.css';
import App from './views/app.js';
import swRegister from './utils/sw-register';

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});


    const defaultPosition = { lat: -6.1751, lng: 106.8271 }; // Monas, Jakarta
    let marker;

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

    const checkLocationButton = document.getElementById('checkLocation');
    checkLocationButton.addEventListener('click', () => {
        Swal.fire({
            title: 'Choose Marker Location',
            html: '<div id="swal-map"></div>',
            didOpen: () => {
                const swalMap = L.map('swal-map').setView([initialLat, initialLng], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; OpenStreetMap contributors'
                }).addTo(swalMap);

                marker = L.marker([initialLat, initialLng], { draggable: true }).addTo(swalMap);

                marker.on('dragend', () => {
                    const position = marker.getLatLng();
                    localStorage.setItem('markerPositionLeaflet', JSON.stringify({
                        lat: position.lat,
                        lng: position.lng
                    }));
                });
            },
            preConfirm: () => {
                const position = marker.getLatLng();
                localStorage.setItem('markerPositionLeaflet', JSON.stringify({
                    lat: position.lat,
                    lng: position.lng
                }));
                return JSON.stringify({ lat: position.lat, lng: position.lng });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const newPosition = JSON.parse(result.value);
                initialLat = newPosition.lat;
                initialLng = newPosition.lng;

                Swal.fire({
                    title: 'Location Updated',
                    text: `Marker is at: lat = ${initialLat}, lng = ${initialLng}`,
                    icon: 'success'
                });
            }
        });
    });