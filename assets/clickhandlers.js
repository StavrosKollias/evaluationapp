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
   var leddiv = document.getElementsByClassName("container")[3];

   if (event.innerHTML == "Device Connection") {
      devicecon.classList.add("show");
      quickeval.classList.remove("show");
      caldiv.classList.remove("show");
      leddiv.classList.remove("show");
   }

   if (event.innerHTML == "Quick Evaluation") {
      quickeval.classList.add("show");
      caldiv.classList.remove("show");
      leddiv.classList.remove("show");
      devicecon.classList.remove("show");
   }
   if (event.innerHTML == "Calibration") {
      quickeval.classList.remove("show");
      caldiv.classList.add("show");
      leddiv.classList.remove("show");
      devicecon.classList.remove("show");
   }

   if (event.innerHTML == "Evaluation") {
      quickeval.classList.remove("show");
      caldiv.classList.remove("show");
      leddiv.classList.add("show");
      devicecon.classList.remove("show");
   }
}
