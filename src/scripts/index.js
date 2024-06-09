/* eslint-disable import/extensions */
import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
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

  document.addEventListener('DOMContentLoaded', function() {
    var hamburgerButton = document.getElementById('hamburgerButton');
    var navigation = document.querySelector('.app-bar .app-bar__navigation');

    hamburgerButton.addEventListener('click', function() {
      navigation.classList.toggle('visible');
    });
  });

