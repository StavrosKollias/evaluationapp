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

// ---------------Functions----------------//
function startLearning(element) {
  if (ispausedUpdate) {
    ispausedUpdate = false;
    element.innerHTML = "Stop Capturing";
    element.style.backgroundColor = "red";
    resetCharts(lineChartForce, lineChartHeight);
    var printbtn = document.getElementById("print-btn");
    printbtn.classList.add("disableBtn");
  } else {
    ispausedUpdate = true;
    element.innerHTML = "Start Learning";
    element.style.backgroundColor = "green";
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
