const back = require("androidjs").back;
const udp = require("./assets/js/udpComunication");
const tcpip = require("./assets/js/tcpipdata");
const http = require("http");
var ip = require("ip");
var connectedDevice;
var counterIpAddress = 0;
back.on("give Me Devices", function () {
  udp.startUPDdeviceTable();
  if (connectedDevice != undefined && connectedDevice != null) {
    back.send("connected Device", connectedDevice);
  }
});

back.on("connected Device", function (device) {
  connectDevice(device);
});

back.on("give me Connected Device forCal", function () {
  back.send("connected Device forCal", connectedDevice);
});

function connectDevice(device) {
  if (device != null) {
    connectedDevice = device;
    back.send("connected", device);
  } else {
    connectedDevice = null;
    back.send("connected", device);
  }
}
function startLearning(ip) {
  http
    .get(`http://${ip}/buttons.cgi?btn=G3Local_StartLearning`, (resp) => {
      let data = "";
      resp.on("end", () => {
        console.log(data);
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
}
back.on("start learning", function () {
  startLearning(connectedDevice.ip);
  tcpip.tCPConnection(connectedDevice.ip);
});
back.on("WIFI connect", function (details) {
  sendResponse(details);
});
function sendResponse(details) {
  counterIpAddress = 0;
  checkIploop(details);
}

function checkIploop(details) {
  setTimeout(() => {
    counterIpAddress += 1;
    var ip = checkIPaddress();
    if (ip == "127.0.0.1" && counterIpAddress < 6) {
      checkIploop(details);
    } else {
      var arrayNet = [ip, details[0]];
      back.send("WIFI connection result", arrayNet);
    }
  }, 200);
}

function checkIPaddress() {
  var ipaddress = ip.address();
  return ipaddress;
}

tcpip.tCPConnection("10.0.0.73");
