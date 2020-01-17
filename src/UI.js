function toggleFullScreen() {
  var fullscreen = document.getElementById("root");

  console.log("test");

  if (fullscreen.requestFullscreen) {
    fullscreen.requestFullscreen();
  } else if (fullscreen.webkitRequestFullscreen) {
    fullscreen.webkitRequestFullscreen();
  } else if (fullscreen.mozRequestFullScreen) {
    fullscreen.mozRequestFullScreen();
  }
}

document.addEventListener(
  "keydown",
  function(e) {
    if (e.keyCode === 70) {
      toggleFullScreen();
    }
  },
  false
);

document.addEventListener(
  "keydown",
  function(e) {
    if (e.keyCode === 70) {
      toggleFullScreen();
    }
  },
  false
);
