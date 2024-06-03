const DrawerInitiator = {
  init({ button, drawer, content }) {
    button.addEventListener('click', (event) => {
      this.asToggleDrawer(event, drawer);
    });

    content.addEventListener('click', (event) => {
      this.asCloseDrawer(event, drawer);
    });
  },

  asToggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
  },

  asCloseDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open');
  },
};

export default DrawerInitiator;
