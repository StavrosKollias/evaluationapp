//------------------variables---------------------
const mobilenavBtn = document.getElementById("mobile-nav-btn");
const navigationBar = document.getElementById("navigation-bar");
const body = document.getElementsByTagName("body")[0];

const compliancePopup = document.getElementById("compliance-popup");
const closeCompliancePopupBtn = document.getElementById("close-comp-popup-btn");

const evaluationPopup = document.getElementById("evaluation-popup");
const closeEvaluationPopupBtn = document.getElementById(
  "close-evaluation-popup-btn"
);

const evaluationInstructionspopup = document.getElementById(
  "instructions-eval"
);

const closeEvaluationInstructions = document.getElementById(
  "close-evaluation-pinst-btn"
);

const introductionContainer = document.getElementById("introduction");

const cancelWifiConnectbtn = document.getElementById("cancel-connection");
const connectWifiNetwork = document.getElementById("connect-network");
app.toast.show("Circuitmaster Designs Ltd 2020", 1);
setTimeout(() => {
  introductionContainer.classList.remove("active");
  scanWifi();
}, 2500);

front.on("error Request", function (msg) {
  alert(msg);
});

// ---------------Functions----------------//
function startLearning(element) {
  var string = element.innerText;
  if (string == "Start") {
    front.send("start learning");
    element.innerText = "Stop";
    element.style.backgroundColor = "red";
    resetCharts(lineChartForce, lineChartHeight);
    var printbtn = document.getElementById("print-btn");
    printbtn.classList.add("disableBtn");
  } else {
    element.innerText = "Start";
    element.style.backgroundColor = "green";
  }
}

function visiblefPassword() {
  var x = document.getElementById("network-password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
// Event handlers for Nav btns--------------------------------------//

function opendiv(event) {
  var devicecon = document.getElementsByClassName("container")[0];
  var quickeval = document.getElementsByClassName("container")[1];
  var caldiv = document.getElementsByClassName("container")[2];
  var evaldiv = document.getElementsByClassName("container")[3];
  mobilenavBtn.classList.remove("active");
  navigationBar.classList.remove("active");
  body.classList.remove("mobile");
  if (event.innerHTML == "Device Connection") {
    devicecon.classList.add("show");
    quickeval.classList.remove("show");
    caldiv.classList.remove("show");
    evaldiv.classList.remove("show");
  }

  if (event.innerHTML == "Quick Evaluation") {
    quickeval.classList.add("show");
    caldiv.classList.remove("show");
    evaldiv.classList.remove("show");
    devicecon.classList.remove("show");
  }
  if (event.innerHTML == "Calibration") {
    quickeval.classList.remove("show");
    caldiv.classList.add("show");
    evaldiv.classList.remove("show");
    devicecon.classList.remove("show");
  }

  if (event.innerHTML == "Evaluation") {
    quickeval.classList.remove("show");
    caldiv.classList.remove("show");
    evaldiv.classList.add("show");
    devicecon.classList.remove("show");
  }
}

mobilenavBtn.addEventListener("click", (e) => {
  if (mobilenavBtn.classList.length == 1) {
    mobilenavBtn.classList.add("active");
    navigationBar.classList.add("active");
    body.classList.add("mobile");
  } else {
    mobilenavBtn.classList.remove("active");
    navigationBar.classList.remove("active");
    body.classList.remove("mobile");
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1000 && mobilenavBtn.classList.length == 2) {
    mobilenavBtn.classList.remove("active");
    navigationBar.classList.remove("active");
  }
});

function handleCompliancePopup() {
  const classlistElement = compliancePopup.classList.length;
  if (classlistElement == 1) {
    compliancePopup.classList.add("active");
    closeCompliancePopupBtn.classList.add("active");
    evaluationPopup.classList.remove("active");
    closeEvaluationPopupBtn.classList.remove("active");
  } else {
    compliancePopup.classList.remove("active");
    closeCompliancePopupBtn.classList.remove("active");
  }
}

function hancleClickDropdownCompliance() {
  evaldivShow();
  handleCompliancePopup();
}

function handleEvaluationPopup() {
  const classlistElement = evaluationPopup.classList.length;
  if (classlistElement == 1) {
    evaluationPopup.classList.add("active");
    closeEvaluationPopupBtn.classList.add("active");
    compliancePopup.classList.remove("active");
    closeCompliancePopupBtn.classList.remove("active");
  } else {
    evaluationPopup.classList.remove("active");
    closeEvaluationPopupBtn.classList.remove("active");
  }
}

function hancleClickDropdownEvaluation() {
  evaldivShow();
  handleCompliancePopup();
}

function evaldivShow() {
  var devicecon = document.getElementsByClassName("container")[0];
  var quickeval = document.getElementsByClassName("container")[1];
  var caldiv = document.getElementsByClassName("container")[2];
  var evaldiv = document.getElementsByClassName("container")[3];
  quickeval.classList.remove("show");
  caldiv.classList.remove("show");
  evaldiv.classList.add("show");
  devicecon.classList.remove("show");
}

function handleEvaluationInstructions() {
  const classlistElement = evaluationInstructionspopup.classList.length;
  if (classlistElement == 1) {
    evaluationInstructionspopup.classList.add("active");
    closeEvaluationInstructions.classList.add("active");
  } else {
    evaluationInstructionspopup.classList.remove("active");
    closeEvaluationInstructions.classList.remove("active");
  }
}

cancelWifiConnectbtn.addEventListener("click", (e) => {
  var popupConnect = document.getElementById("popUp-connect");
  popupConnect.classList.remove("active");
  document.getElementById("network-password").value = "";
});
connectWifiNetwork.addEventListener("click", (e) => {
  const ssid = document.getElementById("ssid-connect").innerText;
  const pass = document.getElementById("network-password").value;

  if (pass.length == 0) {
    alert("Enter password");
    document.getElementById("network-password").focus();
  } else {
    connectToWifi(ssid, pass);
  }
});
