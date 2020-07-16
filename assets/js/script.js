var devicesNetwork;
var connectedDevice;
front.on("devices", function (devices) {
  devicesNetwork = devices;

  front.on("connected Device", (device) => {
    connectedDevice = device;
  });

  if (connectedDevice != undefined) {
    actionDevices(devices, connectedDevice);
  } else {
    actionDevices(devices);
  }
});

front.on("connected", function (device) {
  console.log(device);
});

function actionDevices(devices, device) {
  var errorTitle = document.getElementById("error-devices-title");
  var loadinggifConnection = document.getElementById("loading-gif-connection");
  var connectedDevices = checkDevicesNetwork(devices);
  if (connectedDevices) {
    if (device != undefined) {
      adddevices(devicesNetwork, device);
    } else {
      adddevices(devicesNetwork);
    }

    errorTitle.classList.remove("active");
    loadinggifConnection.style.display = "none";
  } else {
    loadinggifConnection.style.display = "block";
  }
}

function checkDevicesNetwork(devices) {
  return devices.length > 0;
}

function requestDevices() {
  front.send("give Me Devices");
}

enableNavBtns = (flag) => {
  const navBtn = Array.from(document.getElementsByClassName("nav-btn"));
  navBtn.map((e, i) => {
    if (flag) {
      e.classList.add("nav-btn-active");
    } else {
      e.classList.remove("nav-btn-active");
    }
  });
};

handleClickconnectDevice = (e) => {
  const button = e.target;
  const buttonText = button.innerText;
  const buttonId = button.id;
  const macaddress = button.parentElement.previousElementSibling.innerText;
  const ip =
    button.parentElement.previousElementSibling.previousElementSibling
      .innerText;
  const hostname =
    button.parentElement.previousElementSibling.previousElementSibling
      .previousElementSibling.innerText;
  const deviceCon = { ip: ip, mac: macaddress, hostname: hostname };
  var connectionbuttons = Array.from(
    document.getElementsByClassName("connection-btn")
  );
  if (buttonText == "Connect") {
    front.send("connected Device", deviceCon);
    button.innerText = "Disconnect";
    button.classList.remove("connection-btn");
    button.classList.add("disconnect-btn");
    connectionbuttons.map((e, i) => {
      if (buttonId != e.id) {
        e.classList.add("disableBtn");
      }
    });
    enableNavBtns(true);
  } else {
    front.send("connected Device", null);
    button.innerText = "Connect";
    button.classList.add("connection-btn");
    button.classList.remove("disconnect-btn");
    connectionbuttons.map((e, i) => {
      if (buttonId != e.id) {
        e.classList.remove("disableBtn");
      }
    });
    enableNavBtns(false);
  }
};

adddevices = (devicesNetwork, device) => {
  var devicestable = document.getElementById("divice-connection");
  if (devicestable.children.length > 0) {
    devicestable.removeChild(devicestable.children[0]);
  }

  var tablebody = document.createElement("tbody");
  addTitleDeviceTable(devicestable, tablebody);
  devicesNetwork.map((e, i) => {
    var tr = document.createElement("tr");
    for (var j = 0; j < 4; j++) {
      var td = document.createElement("td");

      if (j == 0) {
        var hostname = document.createTextNode(e.hostname);
        td.appendChild(hostname);
      }
      if (j == 1) {
        var ip = document.createTextNode(e.ip);
        td.appendChild(ip);
      }
      if (j == 2) {
        var macaddress = document.createTextNode(e.mac);
        td.appendChild(macaddress);
      }
      if (j == 3) {
        var button = document.createElement("button");
        if (device != undefined) {
          if (e.hostname == device.hostname) {
            var btntext = document.createTextNode("Disconnect");
            button.setAttribute("class", "disconnect-btn");
          } else {
            if (e.connected == "Disconnected") {
              var btntext = document.createTextNode("Connect");
              button.setAttribute("class", "disableBtn");
            } else {
              var btntext = document.createTextNode("OtherSrv");
              button.setAttribute("class", "disableBtn");
            }
          }
        } else {
          if (e.connected == "Disconnected") {
            var btntext = document.createTextNode("Connect");
            var button = document.createElement("button");
          } else {
            var btntext = document.createTextNode("OtherSrv");
            button.setAttribute("class", "disableBtn");
          }
        }

        button.appendChild(btntext);
        td.appendChild(button);

        if (device != undefined) {
          if (e.hostname == device.hostname) {
            button.setAttribute("class", "disconnect-btn");
          } else {
            if (e.connected == "Disconnected") {
              var btntext = document.createTextNode("Connect");
              button.setAttribute("class", "connection-btn disableBtn");
            } else {
              var btntext = document.createTextNode("OtherSrv");
              button.setAttribute("class", "connection-btn disableBtn");
            }
          }
        } else {
          if (e.connected == "Disconnected") {
            button.setAttribute("class", "connection-btn");
          } else {
            button.setAttribute("class", "connection-btn disableBtn");
          }
        }

        button.setAttribute("id", e.hostname);
        button.addEventListener("click", (e) => handleClickconnectDevice(e));
      }

      tr.appendChild(td);
    }
    tablebody.appendChild(tr);
  });
};

addTitleDeviceTable = (table, body) => {
  var trheader = document.createElement("tr");
  var tdName = document.createElement("td");
  var nametitle = document.createTextNode("Name");
  tdName.appendChild(nametitle);
  var tdIP = document.createElement("td");
  var iptitle = document.createTextNode("Ip");
  tdIP.appendChild(iptitle);

  var tdMac = document.createElement("td");
  var mactitle = document.createTextNode("mac");
  tdMac.appendChild(mactitle);
  var tdbutton = document.createElement("td");
  trheader.appendChild(tdName);
  trheader.appendChild(tdIP);
  trheader.appendChild(tdMac);
  trheader.appendChild(tdbutton);
  body.appendChild(trheader);
  table.appendChild(body);
};

// adddevices(devices);

// var devices = [
//   {
//     ip: "192.168.1.102",
//     alive: true,
//     hostname: "Press 1",
//     mac: "00:1e:c0:ce:94:ca",
//     vendor: "Technology",
//     hostnameError: null,
//     macError: null,
//     vendorError: null,
//   },
//   {
//     ip: "192.168.1.103",
//     alive: true,
//     hostname: "Press 2",
//     mac: "00:1e:c0:ce:94:ca",
//     vendor: "Technology",
//     hostnameError: null,
//     macError: null,
//     vendorError: null,
//   },
//   {
//     ip: "192.168.1.104",
//     alive: true,
//     hostname: "Press 3",
//     mac: "00:1e:c0:ce:94:ca",
//     vendor: "Technology",
//     hostnameError: null,
//     macError: null,
//     vendorError: null,
//   },
//   {
//     ip: "192.168.1.105",
//     alive: true,
//     hostname: "Press 4",
//     mac: "00:1e:c0:ce:94:ca",
//     vendor: "Technology",
//     hostnameError: null,
//     macError: null,
//     vendorError: null,
//   },
// ];
