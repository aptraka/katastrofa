
import Swal from 'sweetalert2';
import DisasterDBSource from '../../data/data-source';
import { badConnection } from '../templates/template-creator';

const news = {
    async render() {
        return `

    <div id="offline"></div>
        <div id="dynamicContent">
            <main>
                <div class="content">
                    <div class="content-description">
                        <h1 class="title">Website Pemantauan</h1>
                        <h2 class="title">Bencana Banjir</h2>
                        <p>Pada Wilayah Kota Jakarta</p>
                        <a href="../scripts/forum.html">Forum</a>
                    </div>
                    <div class="content-image">
                        <img src="../images/weather.png" alt="Weather" />
                    </div>
                </div>
            </main>
        </div>
        `;
    },
    
    async afterRender() {
        const offlineContainer = document.querySelector('#offline');
        const dynamicContent = document.getElementById('dynamicContent');
        const mainContentHTML = `
            <div class="info_one">
                <h1>Kenapa di Kota Jakarta Sering Terjadi Banjir?</h1>
                <p>Banjir sering terjadi di Jakarta karena beberapa faktor utama. Topografi rendah menyebabkan banyak wilayah berada di bawah permukaan laut, membuatnya rentan terhadap genangan. Sistem drainase yang buruk sering tersumbat sampah, menghambat aliran air. Selain itu, urbanisasi cepat yang kurang terencana mengurangi daerah resapan air, sehingga air hujan tidak dapat terserap dengan baik ke dalam tanah. Kombinasi faktor-faktor ini menyebabkan banjir menjadi masalah berulang di Jakarta.</p>
            </div>
            <div class ="information">
                <div class="info_two">
                <h1>Dampak Negatif yang Timbul Akibat Banjir</h1>
                <img src="../images/banjir jakarta.jpg" alt="Banjir" />
                <h2>Dampak Terhadap Manusia</h2>
                <p>Banjir sering menyebabkan korban jiwa dan cedera serius akibat terjebak atau hanyut dalam arus air yang deras. Selain itu, banjir menjadi medium penyebaran penyakit seperti diare, leptospirosis, malaria, dan penyakit kulit.</p>
                <h2>Dampak Terhadap Lingkungan</h2>
                <p>Banjir dapat merusak habitat alami, mengubah struktur tanah, dan menghancurkan flora serta fauna lokal. Aliran air yang deras dapat menyebabkan erosi tanah yang parah, menghilangkan lapisan tanah atas yang subur, dan merusak lahan pertanian.</p>
                <h2>Dampak Ekonomi</h2>
                <p>Kerugian akibat kerusakan properti, infrastruktur, lahan pertanian, dan gangguan bisnis menyebabkan beban finansial yang berat bagi individu, bisnis, dan pemerintah.</p>
                <h2>Apa yang Harus Dilakukan Jika Terjadi Banjir?</h2>
                <p>Saat banjir, segera cari tempat tinggi yang aman, matikan listrik, dan amankan dokumen penting. Dengarkan informasi dari pihak berwenang. Jangan berjalan atau mengemudi melalui air banjir. Jika ada perintah evakuasi, ikuti instruksi dengan tenang.</p>
                </div>
                <div id="news_container"></div>
            </div>
        `;
        dynamicContent.innerHTML = mainContentHTML;

        // Populate news data
       
        try {
            Swal.fire({
              title: 'Get All Data...',
              text: 'Please wait while we process Data.',
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading();
              },
            });
            const newsContainer = document.getElementById('news_container');
            const report = await DisasterDBSource.getAllNews();
            const newsData = report.data.reports
            console.log(newsData);
            newsData.forEach(news => {
                const newsElement = `
                    <div class="news_item">
                        <div class="header">
                            <img src="../images/detik.png" alt="${news.author}" />
                            <div class="header_text">
                                <p>${news.author}</p>
                                <p>${news.url}</p>
                            </div>
                        </div>
                        <h1><a href="${news.url}" target="_blank">${news.title}</a></h1>
                        <p>${news.description}</p>
                    </div>
                `;
                newsContainer.innerHTML += newsElement;
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
    }
}
export default news;
