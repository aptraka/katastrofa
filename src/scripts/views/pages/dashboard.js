/* eslint-disable import/no-extraneous-dependencies */
import Swal from 'sweetalert2';
import DisasterDBSource from '../../data/data-source';
import { badConnection, createRestoItemTemplate } from '../templates/template-creator';

const Dashboard = {
  async render() {
    return `
    <div class="weather-card">
        <header>
            <div class="location">Semarang</div>
            <div class="region">Central Java</div>
            <div class="country">Indonesia</div>
        </header>
        <div class="current">
            <img src="//cdn.weatherapi.com/weather/64x64/day/263.png" alt="Weather Icon">
            <div class="details">
                <div class="detail-item">
                    <span>Temperature:</span>
                    <span>27.8°C</span>
                </div>
                <div class="detail-item">
                    <span>Condition:</span>
                    <span>Patchy light drizzle</span>
                </div>
                <div class="detail-item">
                    <span>Humidity:</span>
                    <span>70%</span>
                </div>
                <div class="detail-item">
                    <span>Wind:</span>
                    <span>7.6 kph SSE</span>
                </div>
                <div class="detail-item">
                    <span>Feels Like:</span>
                    <span>30.6°C</span>
                </div>
                <div class="detail-item">
                    <span>Visibility:</span>
                    <span>5 km</span>
                </div>
                <div class="detail-item">
                    <span>Pressure:</span>
                    <span>1012.0 mb</span>
                </div>
                <div class="detail-item">
                    <span>UV Index:</span>
                    <span>7</span>
                </div>
            </div>
        </div>
        <div class="report-button">
            <button>Laporan</button>
        </div>
    </div>
    `;
  },

  async afterRender() {
    const city = document.querySelector('#city');
    const temperature = document.querySelector('#temperature');
    try {
      Swal.fire({
        title: 'Get All Data...',
        text: 'Please wait while we process Data.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const weather = await DisasterDBSource.getWeather();
      console.log(weather);
      Swal.close();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Something went wrong! \nError: ${error}`,
      });
      offlineContainer.innerHTML = badConnection();
    }
  },
};

export default Dashboard;
