var ip = require("ip");
const back = require("androidjs").back;
var dgram = require("dgram");

class Device {
  constructor(hostname, pressname, macaddress, ip) {
    this.hostname = hostname;
    this.pressName = pressname;
    this.mac = macaddress;
    this.ip = ip;
  }
}

function sendDevices(records) {
  back.send("devices", records);
}

function createRecord(stringRecord, ipItem) {
  var arrayDeviceResponse = stringRecord.split(",");
  var arrayPressName = arrayDeviceResponse[3].split("|");
  var pressName = arrayPressName[1];
  var address = ipItem.address;
  var device = new Device(
    arrayDeviceResponse[0],
    pressName,
    arrayDeviceResponse[1],
    address
  );
  return device;
}

module.exports.startUPDdeviceTable = function () {
  var devices = [];
  var portRecieve = 735;
  var iplistenning = ip.address();
  var msgResponse = Buffer.from("D");
  var server = dgram.createSocket("udp4");

  server.on("listening", function () {
    server.setBroadcast(true);
  });

  server.on("message", function (msg, rinfo) {
    var string = msg.toString("utf8").split("\r\n").join();
    var joinedString = string.split(" ").join("");
    var device = createRecord(joinedString, rinfo);
    devices.push(device);
    sendDevices(devices);
  });

  //server.bind(portRecieve, iplistenning);
  // // Send message D to 255.255.255.255
  var PORT = 30303;
  var BROADCAST_ADDR = "255.255.255.255";
  server.send(
    msgResponse,
    0,
    msgResponse.length,
    PORT,
    BROADCAST_ADDR,
    function (err) {
      if (err) throw err;
    }
  );
};
