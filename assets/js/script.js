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

function generateObjDevice(element) {
  const buttonText = element.innerText;
  const buttonId = element.id;
  const macaddress = element.parentElement.previousElementSibling.innerText;
  const ip =
    element.parentElement.previousElementSibling.previousElementSibling
      .innerText;
  const hostname =
    element.parentElement.previousElementSibling.previousElementSibling
      .previousElementSibling.innerText;
  const deviceCon = { ip: ip, mac: macaddress, hostname: hostname };
  return deviceCon;
}

function generateTargetEvent(event) {
  return event.target;
}

function arrayMap(arr, operationFunction) {
  arr.map((e, i) => {
    operationFunction(e, "disableBtn");
  });
}

function idCheckElements(element1, element2) {
  if (buttonId != e.id) {
    return true;
  } else {
    return false;
  }
}
function removeClassFromElement(element, className) {
  element.classList.remove(className);
}

function addClassToElement(element, className) {
  element.classList.add(className);
}

function addChildToElement(parent, child) {
  parent.appendChild(child);
}
function removeChildFromElement(element, child) {
  element.removeChild(child);
}

function addAttributeToElemet(element, type, string) {
  element.setAttribute(type, string);
}

handleClickConnectDevice = (e) => {
  const button = generateTargetEvent(e);
  const deviceCon = generateObjDevice(button);
  const buttonText = button.innerText;
  var connectionbuttons = Array.from(
    document.getElementsByClassName("connection-btn")
  );
  if (buttonText == "Connect") {
    front.send("connected Device", deviceCon);
    button.innerText = "Disconnect";
    arrayMap(connectionbuttons, addClassToElement);
    removeClassFromElement(button, "disableBtn");
    addClassToElement(button, "disconnect-btn");
    enableNavBtns(true);
    loadVCP(deviceCon.ip);
    clickHandlersVCP(deviceCon.ip);
  } else {
    front.send("connected Device", null);
    button.innerText = "Connect";
    arrayMap(connectionbuttons, removeClassFromElement);
    removeClassFromElement(button, "disconnect-btn");
    enableNavBtns(false);
  }
};

adddevices = (devicesNetwork, device) => {
  var devicestable = document.getElementById("divice-connection");
  removeTableElementChild(devicestable);

  var tablebody = document.createElement("tbody");
  addTitleDeviceTable(devicestable, tablebody);
  devicesNetwork.map((e, i) => {
    var tr = document.createElement("tr");
    for (var j = 0; j < 4; j++) {
      var td = document.createElement("td");
      if (j == 0) {
        var hostName = document.createTextNode(e.hostname);
        addChildToElement(td, hostName);
      }
      if (j == 1) {
        var ip = document.createTextNode(e.ip);
        addChildToElement(td, ip);
      }
      if (j == 2) {
        var macAddress = document.createTextNode(e.mac);
        addChildToElement(td, macAddress);
      }
      if (j == 3) {
        var button = document.createElement("button");
        if (device != undefined) {
          if (e.hostname == device.hostname) {
            var btnText = document.createTextNode("Disconnect");
            addAttributeToElemet(button, "class", "disconnect-btn");
          } else {
            if (e.connected == "Disconnected") {
              var btnText = document.createTextNode("Connect");
              addAttributeToElemet(button, "class", "disableBtn");
            } else {
              var btnText = document.createTextNode("OtherSrv");
              addAttributeToElemet(button, "class", "disableBtn");
            }
          }
        } else {
          if (e.connected == "Disconnected") {
            var btnText = document.createTextNode("Connect");
            var button = document.createElement("button");
          } else {
            var btnText = document.createTextNode("OtherSrv");
            addAttributeToElemet(button, "class", "disableBtn");
          }
        }
        addChildToElement(button, btnText);
        addChildToElement(td, button);

        if (device != undefined) {
          if (e.hostname == device.hostname) {
            addAttributeToElemet(button, "class", "disconnect-btn");
          } else {
            if (e.connected == "Disconnected") {
              var btnText = document.createTextNode("Connect");
              addAttributeToElemet(
                button,
                "class",
                "connection-btn disableBtn"
              );
            } else {
              var btnText = document.createTextNode("OtherSrv");
              addAttributeToElemet(
                button,
                "class",
                "connection-btn disableBtn"
              );
            }
          }
        } else {
          if (e.connected == "Disconnected") {
            addAttributeToElemet(button, "class", "connection-btn");
          } else {
            addAttributeToElemet(button, "class", "connection-btn disableBtn");
          }
        }
        addAttributeToElemet(button, "id", e.hostname);
        button.addEventListener("click", (e) => handleClickConnectDevice(e));
      }

      addChildToElement(tr, td);
    }
    addChildToElement(tablebody, tr);
  });
};

function removeTableElementChild(element) {
  if (element.children.length > 0) {
    removeChildFromElement(element, element.children[0]);
  }
}

addTitleDeviceTable = (table, body) => {
  var trheader = document.createElement("tr");
  var tdName = document.createElement("td");
  var nameTitle = document.createTextNode("Name");
  addChildToElement(tdName, nameTitle);
  var tdIP = document.createElement("td");
  var ipTitle = document.createTextNode("Ip");
  addChildToElement(tdIP, ipTitle);
  var tdMac = document.createElement("td");
  var macTitle = document.createTextNode("mac");
  addChildToElement(tdMac, macTitle);
  var tdbutton = document.createElement("td");
  addChildToElement(trheader, tdName);
  addChildToElement(trheader, tdIP);
  addChildToElement(trheader, tdMac);
  addChildToElement(trheader, tdbutton);
  addChildToElement(body, trheader);
  addChildToElement(table, body);
};
