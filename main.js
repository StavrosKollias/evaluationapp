const back = require("androidjs").back;
const udp = require("./assets/js/udpComunication");
const tcpip = require("./assets/js/tcpipdata");
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
  // http://${connectedDevice.hostname}/buttons.cgi?btn=G3Local_StartLearning
  // http.get(
  //   `http://${connectedDevice.hostname}/buttons.cgi?btn=G3Local_StartLearning`
  // );
  // http.get(`http://CFA_0993FB/buttons.cgi?btn=G3Local_StartLearning`);
  startLearning(connectedDevice.ip);
  tcpip.tCPConnection(connectedDevice);
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

// http
//   .get(`http://CFA_0993FB/buttons.cgi?btn=G3Local_StartLearning`, (resp) => {
//     let data = "";

//     // A chunk of data has been recieved.
//     resp.on("data", (chunk) => {
//       data += chunk;
//     });

//     // The whole response has been received. Print out the result.
//     resp.on("end", () => {
//       console.log(data);
//     });
//   })
//   .on("error", (err) => {
//     console.log("Error: " + err.message);
//     back.send("error Request", err.message);
//   });
//  -------------debug PC testing-------------

// var device = {
//   hostname: "CFA_0993FB",
//   pressName: "CFA_0993FB",
//   macaddress: "54-10-EC-09-93-FB",
//   ip: "10.0.0.66",
// };
// tcpip.tCPConnection(device);
// udp.startUPDdeviceTable();
//listen to udp traffic on port 30303

// var Test = [
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

// back.on("hello from front", function () {
//    back.send("hello from back", "Hello from Android JS");
// });
