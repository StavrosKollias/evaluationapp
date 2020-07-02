const back = require("androidjs").back;
const netList = require("network-list");
const net = require("net");
var devices = [];
var ip = require("ip");
var portRecieve = 735;
var iplistenning = ip.address();
var dgram = require("dgram");
var server = dgram.createSocket("udp4");

var msgResponse = Buffer.from("D");
server.on("message", function (msg, rinfo) {
  var string = msg.toString("utf8").split("\r\n").join();
  var joinedString = string.split(" ").join("");
  devices.push(joinedString);
  console.log(devices);
});

server.on("listening", function () {
  server.setBroadcast(true);
  var address = iplistenning + ":735";
  console.log("server listening " + address);
});
server.on("connect", () => {
  console.log("connected");
});

server.bind(portRecieve, iplistenning); //listen to udp traffic on port 30303

// Send message D to 255.255.255.255
var PORT = 30303;
var BROADCAST_ADDR = "255.255.255.255"; //

setInterval(() => {
  sendDevicesToFront(devices);
  devices = [];
  server.send(
    msgResponse,
    0,
    msgResponse.length,
    PORT,
    BROADCAST_ADDR,
    function (err) {
      if (err) throw err;

      console.log(
        "UDP server message sent" +
          msgResponse +
          " to " +
          BROADCAST_ADDR +
          ":" +
          PORT
      );
    }
  );
}, 10000);

function sendDevicesToFront(devices) {
  back.on("devices", function () {
    back.send(devices);
  });
}
// back.on("hello from front", function () {
//    back.send("hello from back", "Hello from Android JS");
// });
