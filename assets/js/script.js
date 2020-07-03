// front.send("hello from front");
// front.on("hello from back", function (msg) {
//    console.log(msg);
//    $("#msg").html(msg);
// });

var devicesNetwork;
// function askDevices()

front.on("devices", function (devices) {
  devicesNetwork = devices;
  actionDevices(devices);
});

front.on("connected", function (device) {
  console.log(device);
});

function actionDevices(devices) {
  var errorTitle = document.getElementById("error-devices-title");
  var connectedDevices = checkDevicesNetwork(devices);
  if (connectedDevices) {
    adddevices(devicesNetwork);
    errorTitle.classList.remove("active");
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
    sendDeviceSelected(deviceCon, true);
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
    sendDeviceSelected(deviceCon, false);
  }
};

sendDeviceSelected = (deviceCon, flag) => {
  var post = { deviceCon: deviceCon, flag: flag };
  // front.send("/connectdevice", post);
};

adddevices = (devicesNetwork) => {
  var devicestable = document.getElementById("divice-connection");
  if (devicestable.children.length > 0) {
    devicestable.removeChild(devicestable.children[0]);
  }

  var tablebody = document.createElement("tbody");
  //var tablebody = devicestable.children[0];
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
        var btntext = document.createTextNode("Connect");
        var button = document.createElement("button");
        button.appendChild(btntext);
        td.appendChild(button);

        button.setAttribute("class", "connection-btn");
        button.setAttribute("id", e.hostname);
        button.addEventListener("click", (e) => handleClickconnectDevice(e));
      }

      tr.appendChild(td);
    }
    tablebody.appendChild(tr);
  });
  // hostname;
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
