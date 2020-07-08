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

var globalString = "";
function stringRechievedData(stringRecieved) {
  globalString += stringRecieved;
  return globalString;
}

function splitCarageReturn(string) {
  var arradyData = string.split(/\n/);
  console.log(arradyData);
  var resultsarray = [];

  arradyData.map((e, i) => {
    if (e.includes("CFA|")) {
      resultsarray.push(e);
    }
  });

  return resultsarray;
}

module.exports.tCPConnection = function (ip) {
  var port = 9760;
  var host = ip;
  var socket = net.connect(port, host);

  socket.setEncoding("utf8");
  socket.on("connect", function () {
    console.log("connecting");
    incomingDataCfa = [];
  });
  socket.on("ready", function () {
    socket.write("f\r\n");
    setInterval(() => {
      socket.write("\r\n");
    }, 4000);
  });

  let body = "";

  socket.on("data", function (data) {
    //"CFA|S68280#12 [97%] 1879N=OK 327mJ (3/50) PA"
    body = "";
    body += data.toString();
    // var allbody = stringRechievedData(body);
    // var newData = splitCarageReturn(allbody);
    if (body.includes("CFA|")) {
      var index = body.indexOf("CFA|");
      var processedString = splitCarageReturn(body);
      if (processedString.length > 0) {
        processedString.map((e) => {
          var res = e;
          back.send("data back end ", res);
          var result = generateData(res);
          incomingDataCfa.push(result);
        });
        dataLength = incomingDataCfa.length;

        if (dataLength > 3) {
          console.log(incomingDataCfa);
          var productionData = incomingDataCfa.slice(3);
          back.send("data", productionData);
        }
      }
    }
  });

  socket.on("end", function () {
    console.log("ending");
    incomingDataCfa = [];
    back.send("error tcpip", "Ending");
  });

  socket.on("timeout", function () {
    console.log("timeout");
    back.send("error tcpip", "Timed out");
  });

  socket.on("close", function () {
    incomingDataCfa = [];
    back.send("error tcpip", "Closing");
  });

  socket.on("error", function (err) {
    console.log("Error");
    back.send("error tcpip", "Error");
  });
};

// module.exports.stopTCPconnection() = function (){

// }
