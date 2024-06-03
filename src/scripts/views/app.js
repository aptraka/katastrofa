import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, content }) {
    this.asButton = button;
    this.asDrawer = drawer;
    this.asContent = content;

    this.asInitialAppShell();
  }

  asInitialAppShell() {
    DrawerInitiator.init({
      button: this.asButton,
      drawer: this.asDrawer,
      content: this.asContent,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this.asContent.innerHTML = await page.render();
    await page.afterRender();
    const skipLinkElem = document.querySelector('.skip-link');
    skipLinkElem.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#mainContent').focus();
    });
  }
}

export default App;
