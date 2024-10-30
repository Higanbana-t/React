const playButtons = document.querySelectorAll('.playListPlay');
const makeAllPlay = () => {
    playButtons.forEach(button => {
      button.classList.remove('bi-pause-fill');
      button.classList.add('bi-play-fill');
    });
  };
