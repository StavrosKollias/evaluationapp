var net = require("net");
const back = require("androidjs").back;
var incomingDataCfa = [];
function generateData(incomingstring) {
  // "CFA|S68280#12 [97%] 1879N=OK 327mJ (3/50) PA"
  var splitString = incomingstring.split("|");
  var resultsString = splitString[1];
  var splitResultString = resultsString.split(" ");
  var jobseasonSequence = splitResultString[0];
  var splitSeqJob = jobseasonSequence.split("#");
  var sequence = splitSeqJob[1];
  var jobnumber = splitSeqJob[0];
  var headroom = splitResultString[1].slice(1, 3);
  var forceString = splitResultString[2];
  var splitForceString = forceString.split("=");
  var force = splitForceString[0];
  var mJ = splitResultString[3];
  var missMatchResult = splitResultString[4];
  var x = missMatchResult.replace(")", "");
  var y = x.replace(")", "");
  var missMatch = missMatchResult.split(")").join("").split("(").join("");
  var result = splitResultString[5];
  var incommingResult = {
    sequence: sequence,
    jobnumber: jobnumber,
    force: force,
    headroom: headroom,
    mJ: mJ,
    missMatch: missMatch,
    result: result,
  };
  return incommingResult;
}

module.exports.tCPConnection = function (listConnectedDevices) {
  var port = 9760;
  var host = listConnectedDevices.ip;
  var socket = net.connect(port, host);

  socket.setEncoding("utf8");
  socket.on("connect", function () {
    console.log("connecting");
    incomingDataCfa = [];
  });
  let res;
  socket.on("ready", function () {
    // console.log("ready");
    socket.write("f\r\n");
    setInterval(() => {
      socket.write("\r\n");
    }, 5000);
  });

  var count = 0;
  let body = "";

  socket.on("data", function (data) {
    count += 1;
    //"CFA|S68280#12 [97%] 1879N=OK 327mJ (3/50) PA"
    body = "";
    body += data.toString();
    if (body.includes("CFA")) {
      console.log("contains CFA results overview");
      res = body.slice(0, 49);
      var result = generateData(res);
      incomingDataCfa.push(result);
      dataLength = incomingDataCfa.length;
      if (dataLength > 2) {
        back.send("data", incomingDataCfa);
      }
    }
  });

  socket.on("end", function () {
    console.log("ending");
    incomingDataCfa = [];
  });

  socket.on("timeout", function () {
    console.log("timeout");
  });

  socket.on("close", function () {
    // console.log("connection Socket closed");
    incomingDataCfa = [];
    tCPConnection();
  });

  socket.on("error", function (err) {
    console.log("Error");
    console.log(err);
  });
};

// module.exports.stopTCPconnection() = function (){

// }
