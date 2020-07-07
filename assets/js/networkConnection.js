const networkBall = document.getElementById("network-circle");

setInterval(() => {
  var connection = app.wifi.getState();
  if (connection > 1) {
    networkBall.classList.add("active");
  } else {
    networkBall.classList.remove("active");
  }
}, 1000);
