const networkBall = document.getElementById("network-circle");

var connection =
  navigator.connection || navigator.mozConnection || navigator.webkitConnection;
setInterval(() => {
  if (connection.rtt > 0) {
    networkBall.classList.add("active");
  } else {
    networkBall.classList.remove("active");
  }
}, 1000);
