const networkBall = document.getElementById("network-circle");

var connection = app.wifi.getState();
setInterval(() => {
  if (connection > 1) {
    networkBall.classList.add("active");
  } else {
    networkBall.classList.remove("active");
  }
}, 1000);
