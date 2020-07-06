const loadingWifi = document.getElementById("loading-gif-wifi");
const wifiListcontainer = document.getElementById(
  "wifi-network-list-container"
);
const containerlist = document.getElementById("wifi-list-container");
const refreshBtn = document.getElementById("scan-btn");

function disablerefreshbtn() {
  if (!refreshBtn.disabled) {
    refreshBtn.disabled = true;
  } else {
    refreshBtn.disabled = false;
  }
}

function removeChildrenWifiList() {
  var childrenLength = wifiListcontainer.children.length;
  if (childrenLength > 0) {
    for (i = 0; i <= childrenLength - 1; i++) {
      wifiListcontainer.removeChild(wifiListcontainer.children[0]);
    }
  }
  loadingWifi.style.display = "block";
}

function scanWifi() {
  disablerefreshbtn();
  removeChildrenWifiList();
  new Promise(function (resolve, reject) {
    console.log("before enable:" + app.wifi.getState());
    if (app.wifi.isEnabled()) {
      app.wifi.disconnect();
    } else {
      app.wifi.enable();
    }

    setTimeout(resolve, 5000);
  }).then(function () {
    let available_networks = app.wifi.getScanResults();
    console.log(available_networks);
    var networksLength = available_networks.length;
    console.log("after enable:" + app.wifi.getState());
    if (networksLength > 0) {
      disablerefreshbtn();
      loadingWifi.style.display = "none";
      console.log(available_networks);
      containerlist.classList.add("active");
      available_networks.map((network, i) => {
        generateWifiList(network, i);
      });
    } else {
      scanWifi();
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
  setTimeout(() => {
    if (status > 1) {
      // console.log(status);
      document.getElementById("popUp-connect").classList.remove("active");
      document.getElementById("wifi-container").classList.remove("active");
      setTimeout(() => {
        front.send("give Me Devices");
      }, 5000);
    }
  }, 1000);
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