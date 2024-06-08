/* eslint-disable import/no-extraneous-dependencies */
import Swal from 'sweetalert2';
import DisasterDBSource from '../../data/data-source';
import { badConnection } from '../templates/template-creator';

const Dashboard = {
  async render() {
    return `
    <div id="offline"> </div>
    <div class="mid_content">
    <div class="weather-card" id="weather-card">
        <header>
          <div class="location" id="location"></div>
          <div class="region" id="region"></div>
          <div class="country" id="country"></div>
      </header>
      <div class="current">
        <img src="" alt="Weather Icon" id="weather-icon">
        <div class="details" id="weather-details">
            <div class="detail-item">
                <span>Temperature:</span>
                <span id="temperature"></span>
            </div>
            <div class="detail-item">
                <span>Condition:</span>
                <span id="condition"></span>
            </div>
            <div class="detail-item">
                <span>Humidity:</span>
                <span id="humidity"></span>
            </div>
            <div class="detail-item">
                <span>Wind:</span>
                <span id="wind"></span>
            </div>
            <div class="detail-item">
                <span>Feels Like:</span>
                <span id="feels-like"></span>
            </div>
            <div class="detail-item">
                <span>Visibility:</span>
                <span id="visibility"></span>
            </div>
            <div class="detail-item">
                <span>Pressure:</span>
                <span id="pressure"></span>
            </div>
            <div class="detail-item">
                <span>UV Index:</span>
                <span id="uv-index"></span>
                </div>
            </div>
          </div>
          </div>
    
          <div class="education_one">
            <h1>Kapan Banjir Terburuk di Jakarta Terjadi?</h1>
            <p>Banjir terparah yang melanda Jakarta terjadi pada bulan Januari 2020. Banjir ini menyebabkan lebih dari 60 ribu warga mengungsi dan menelan korban jiwa sekitar 66 orang. Genangan air mencapai ketinggian hingga 2-3 meter di beberapa daerah, memutus akses ke berbagai layanan dasar dan mengakibatkan kerugian ekonomi yang signifikan.</p>
        </div>
      </div>
    </div>
    <div class="education_content">
    <div class="main_education">
        <h1>Mengapa Kota Jakarta Sering Terjadi Banjir?</h1>
        <p>Banjir terparah yang melanda Jakarta terjadi pada bulan Januari 2020. Banjir ini menyebabkan lebih dari 60 ribu warga mengungsi dan menelan korban jiwa sekitar 66 orang. Genangan air mencapai ketinggian hingga 2-3 meter di beberapa daerah, memutus akses ke berbagai layanan dasar dan mengakibatkan kerugian ekonomi yang signifikan.</p>
        <a href="#/news">Education</a>
    </div>
    <div class="separator">
    <div class="indicator_info">
        <h1>Faktor Penyebab Banjir</h1>
        <h2>di Wilayah Jakarta</h2>
        <p>Banjir di Jakarta disebabkan oleh berbagai faktor seperti curah hujan tinggi yang melebihi kapasitas drainase, tata ruang kota yang tidak teratur, dan berkurangnya daerah resapan air akibat pembangunan yang tidak terencana. Selain itu, sampah yang menyumbat saluran air memperparah kondisi, dan letak geografis Jakarta yang berada di dataran rendah serta dekat dengan laut membuatnya rentan terhadap banjir pasang surut.</p>
    </div>
    <div class="last_content">
        <h1>Bagikan Informasi Terkini Mengenai Titik Banjir Jakarta pada Forum Diskusi</h1>
        <a href="#/report">Forum</a>
    </div>
    </div>
    `;
  },

  async afterRender() {
    const offlineContainer = document.querySelector('#offline');
    const locationElement = document.getElementById('location');
    const regionElement = document.getElementById('region');
    const countryElement = document.getElementById('country');
    const weatherIconElement = document.getElementById('weather-icon');
    const temperatureElement = document.getElementById('temperature');
    const conditionElement = document.getElementById('condition');
    const humidityElement = document.getElementById('humidity');
    const windElement = document.getElementById('wind');
    const feelsLikeElement = document.getElementById('feels-like');
    const visibilityElement = document.getElementById('visibility');
    const pressureElement = document.getElementById('pressure');
    const uvIndexElement = document.getElementById('uv-index');
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
      locationElement.innerText = weather.location.name;
      regionElement.innerText = weather.location.region;
      countryElement.innerText = weather.location.country;
      weatherIconElement.src = weather.current.condition.icon;
      temperatureElement.innerText = weather.current.temp_c + ' °C';
      conditionElement.innerText = weather.current.condition.text;
      humidityElement.innerText = weather.current.humidity + ' %';
      windElement.innerText = weather.current.wind_kph + ' km/h';
      feelsLikeElement.innerText = weather.current.feelslike_c + ' °C';
      visibilityElement.innerText = weather.current.vis_km + ' km';
      pressureElement.innerText = weather.current.pressure_mb + ' mb';
      uvIndexElement.innerText = weather.current.uv + '';
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
