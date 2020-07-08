const back = require("androidjs").back;
const udp = require("./assets/js/udpComunication");
const tcpip = require("./assets/js/tcpipdata");
const http = require("http");
var ip = require("ip");
var connectedDevice;
back.on("give Me Devices", function () {
  udp.startUPDdeviceTable();
  if (connectedDevice != undefined && connectedDevice != null) {
    back.send("connected Device", connectedDevice);
  }
});

back.on("connected Device", function (device) {
  connectDevice(device);
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

      // A chunk of data has been recieved.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        console.log(data);
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
      back.send("error Request", err.message);
    });
}

back.on("start learning", function () {
  startLearning(connectedDevice.ip);
  tcpip.tCPConnection(connectedDevice.ip);
});
//  wifi connection check
back.on("WIFI connect", function (details) {
  sendResponse(details);
});

function sendResponse(details) {
  var ipaddress = checkIPaddress();
  var arrayNet = [ipaddress, details[0]];
  back.send("WIFI connection result", arrayNet);
}

function checkIPaddress() {
  var ipaddress = ip.address();
  return ipaddress;
}

// tcpip.tCPConnection("10.0.0.66");
