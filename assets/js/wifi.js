const loadingWifi = document.getElementById("loading-gif-wifi");
const wifiListcontainer = document.getElementById(
  "wifi-network-list-container"
);
const containerlist = document.getElementById("wifi-list-container");

function scanWifi() {
  new Promise(function (resolve, reject) {
    console.log("before enable:" + app.wifi.getState());
    app.wifi.enable();
    setTimeout(resolve, 5000);
  }).then(function () {
    let available_networks = app.wifi.getScanResults();
    console.log(available_networks);
    var networksLength = available_networks.length;
    console.log("after enable:" + app.wifi.getState());
    if (networksLength > 0) {
      loadingWifi.style.display = "none";
      console.log(available_networks);
      containerlist.classList.add("active");
      available_networks.map((network, i) => {
        generateWifiList(network, i);
      });
    }
  });
}

// sample object
// BSSID: "20:0c:c8:48:e0:b0"
// SSID: "CMD"
// capabilities: "[WPA2-PSK-CCMP][WPS][ESS]"
// frequency: 2462
// level: -39
// timestamp: 73597604025
// scanWifi();

function generateWifiList(networkObj, i) {
  var listitem = document.createElement("li");
  var ssid = document.createTextNode(networkObj.SSID);
  listitem.appendChild(ssid);
  listitem.setAttribute("class", "wifi-item");
  listitem.setAttribute("id", "wifi-item-" + i);
  wifiListcontainer.appendChild(listitem);
  listitem.addEventListener("click", (e) => {
    handleWifiItemClick(e);
  });
}

function connectToWifi(ssid, pass) {
  app.wifi.connect(ssid, pass);
  var status = checkConnection();
  // if (status > 0) {
  // console.log(status);
  document.getElementById("popUp-connect").classList.remove("active");
  document.getElementById("wifi-container").classList.remove("active");
  front.send("give Me Devices");
  // }
}

function checkConnection() {
  let connectionStatus = app.wifi.getState();
  console.log("after connection enable:" + app.wifi.getState());
  return connectionStatus;
}

function handleWifiItemClick(e) {
  var popupConnect = document.getElementById("popUp-connect");
  popupConnect.classList.add("active");
  document.getElementById("ssid-connect").innerText = e.target.innerText;
  document.getElementById("network-password").focus();
}
