var ispausedUpdate = true;

var evaluationChartForce = document.getElementById("evaluation-chart-force");
var lineChartData = {
  labels: [],
  datasets: [
    {
      label: "Mean",
      data: [],
      type: "line",
      borderColor: "rgba(251, 255, 0, 0.705)",
      fillOpacity: 0.5,
      steppedLine: true,
      showLine: true,
      fill: false,
      pointRadius: 0,
      pointBorderColor: "rgba(251, 255, 0, 0.205)",
      pointBorderWidth: 1,
      cubicInterpolationMode: "default",
      backgroundColor: "rgba(251, 255, 0, 0.205)",
    },
    {
      label: "USL",
      data: [],
      type: "line",
      borderColor: "red",
      fillOpacity: 0.5,
      steppedLine: true,
      showLine: true,
      fill: false,
      pointRadius: 0,
      pointBorderColor: "red",
      pointBorderWidth: 1,
      cubicInterpolationMode: "default",
      backgroundColor: "red",
    },
    {
      label: "LSL",
      data: [],
      type: "line",
      borderColor: "blue",
      fillOpacity: 0.5,
      steppedLine: true,
      showLine: true,
      fill: false,
      pointRadius: 0,
      pointBorderColor: "blue",
      pointBorderWidth: 1,
      cubicInterpolationMode: "default",
      backgroundColor: "blue",
    },
    {
      fillColor: "rgba(255, 0, 212)", //"rgba(0,60,100,1)",
      fillOpacity: 0.5,
      borderColor: "rgba(255, 0, 212)",
      pointBorderColor: "rgba(255, 0, 212)",
      strokeColor: "rgba(255, 0, 212)",
      fill: false,
      borderWidth: 2,
      type: "line",
      steppedLine: false,
      showLine: true,
      pointRadius: 7,
      pointBorderWidth: 1,
      backgroundColor: "rgba(255, 0, 212)",
      hoverBackgroundColor: "rgba(255, 0, 212)",
      cubicInterpolationMode: "default",
      data: [],
      label: "Force Results",
    },
  ],
};

var lineChartForce = new Chart(evaluationChartForce, {
  type: "bar",
  data: lineChartData,
  options: {
    bezierCurve: false,
    responsive: true,
    transitions: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0,
      },
    },
    aspectRatio: 1,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "index",
      intersect: false,
    },
    animation: {
      animateScale: false,
      animateRotate: false,
      duration: 0,
    },
    legend: {
      display: true,
      fontColor: "black",
      labels: {
        fontColor: "black",
      },
      onClick: (e) => e.stopPropagation(),
    },
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Number Samples",
            fontColor: "black",
          },
          gridLines: {
            display: false,
          },
          ticks: {
            fontSize: 15,
            fontColor: "black", // this here
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Force Results (N)",
            fontColor: "black",
          },
          display: true,
          gridLines: {
            display: true,
            color: "#824b78",
          },
          ticks: {
            fontSize: 15,
            fontColor: "black", // this here
            beginAtZero: false,
          },
        },
      ],
    },
  },
});

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDataForce(chart) {
  var newPeak = getRandomIntInclusive(1000, 1200); ////////Chris here you have to put the new recieved Peak froce from the monitor instead on calling a function just update a @@parameter
  var peakForce = chart.data.datasets[3].data;
  peakForce.push(newPeak);
  var labels = chart.data.labels;
  labels.push(String(labels.length + 1));

  var mean = [];
  var meanvalue = Math.round(
    peakForce.reduce((a, b) => a + b, 0) / peakForce.length
  );

  peakForce.map(() => {
    mean.push(meanvalue);
  });
  // --------Std Force Calculation--------------//
  var subtractedArrayForce = peakForce.map(function (item, index) {
    return item - mean[index];
  });

  var force_array_pow = subtractedArrayForce.map(function (x) {
    return Math.pow(x, 2);
  });

  var sumOfsubtracts_force = force_array_pow.reduce((a, b) => a + b, 0);
  var squaredStdForce = sumOfsubtracts_force / subtractedArrayForce.length;
  var stdforce = Math.sqrt(squaredStdForce);
  var varianceforce = Number(document.getElementById("force-tolerance").value);
  var uslforce = [];
  var lslforce = [];
  var Usl_forcevalue = meanvalue + varianceforce / 2;
  var Lsl_forcevalue = meanvalue - varianceforce / 2;
  var CpForce = varianceforce / (6 * stdforce);
  peakForce.map(() => {
    uslforce.push(Usl_forcevalue);
    lslforce.push(Lsl_forcevalue);
  });

  var forcemax = document.getElementById("force-max");
  var forcemin = document.getElementById("force-min");
  var forcestd = document.getElementById("force-std");
  var forcecp = document.getElementById("force-cp");
  if (stdforce != 0 || peakForce.length > 5) {
    forcemax.innerText = Math.max(...peakForce);
    forcemin.innerText = Math.min(...peakForce);
    forcestd.innerText = stdforce.toFixed(4);
    forcecp.innerText = CpForce.toFixed(4);
  } else {
    forcemax.innerText = Math.max(...peakForce);
    forcemin.innerText = Math.min(...peakForce);
    forcestd.innerText = "-";
    forcecp.innerText = "-";
  }

  if (peakForce.length > 5) {
    var printbtn = document.getElementById("print-btn");
    if (printbtn.classList.length == 2) {
      printbtn.classList.remove("disableBtn");
    }
  }
  addNewDataChartForce(chart, peakForce, mean, uslforce, lslforce, labels);
  generateDataHeight(lineChartHeight, peakForce, labels);
}

function addNewDataChartForce(chart, peakForce, mean, USL, LSL, labels) {
  chart.data.datasets[0].data = mean;
  chart.data.datasets[1].data = USL;
  chart.data.datasets[2].data = LSL;
  chart.data.labels = labels;
  chart.data.datasets[3].data = peakForce;

  var minforce = Math.min(...peakForce, LSL[0]);
  var maxforce = Math.max(...peakForce, USL[0]);

  minforce = Math.floor((minforce - 0.05 * minforce) / 100) * 100;
  maxforce = Math.ceil((maxforce + 0.005 * maxforce) / 100) * 100;
  var options = {
    bezierCurve: false,
    responsive: true,
    transitions: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0,
      },
    },
    aspectRatio: 1,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "index",
      intersect: false,
    },
    animation: {
      animateScale: false,
      animateRotate: false,
      duration: 0,
    },
    legend: {
      display: true,
      fontColor: "black",
      labels: {
        fontColor: "black",
      },
      onClick: (e) => e.stopPropagation(),
    },
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Number Samples",
            fontColor: "black",
          },
          gridLines: {
            display: false,
          },
          ticks: {
            fontSize: 15,
            fontColor: "black", // this here
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Force Results (N)",
            fontColor: "black",
          },
          display: true,
          gridLines: {
            display: true,
            color: "#824b78",
          },
          ticks: {
            fontSize: 15,
            fontColor: "black", // this here
            beginAtZero: false,
            min: minforce,
            max: maxforce,
          },
        },
      ],
    },
  };
  chart.options = options;
  chart.update();
  newresult = 0;
}

// Height chart----------------------------------------------------------------------------------------------
var evaluationChartHeight = document.getElementById("evaluation-chart-height");
var lineChartDataHeight = {
  labels: [],
  datasets: [
    {
      label: "Mean",
      data: [],
      type: "line",
      borderColor: "rgba(251, 255, 0, 0.705)",
      fillOpacity: 0.5,
      steppedLine: true,
      showLine: true,
      fill: false,
      pointRadius: 0,
      pointBorderColor: "rgba(251, 255, 0, 0.205)",
      pointBorderWidth: 1,
      cubicInterpolationMode: "default",
      backgroundColor: "rgba(251, 255, 0, 0.205)",
    },
    {
      label: "USL",
      data: [],
      type: "line",
      borderColor: "red",
      fillOpacity: 0.5,
      steppedLine: true,
      showLine: true,
      fill: false,
      pointRadius: 0,
      pointBorderColor: "red",
      pointBorderWidth: 1,
      cubicInterpolationMode: "default",
      backgroundColor: "red",
    },
    {
      label: "LSL",
      data: [],
      type: "line",
      borderColor: "blue",
      fillOpacity: 0.5,
      steppedLine: true,
      showLine: true,
      fill: false,
      pointRadius: 0,
      pointBorderColor: "blue",
      pointBorderWidth: 1,
      cubicInterpolationMode: "default",
      backgroundColor: "blue",
    },
    {
      fillColor: "green", //"rgba(0,60,100,1)",
      fillOpacity: 0.5,
      borderColor: "green",
      pointBorderColor: "green",
      strokeColor: "green",
      fill: false,
      borderWidth: 2,
      type: "line",
      steppedLine: false,
      showLine: true,
      pointRadius: 7,
      pointBorderWidth: 1,
      backgroundColor: "green",
      hoverBackgroundColor: "green",
      cubicInterpolationMode: "default",
      data: [],
      label: "Height Results",
    },
  ],
};

var lineChartHeight = new Chart(evaluationChartHeight, {
  type: "bar",
  data: lineChartDataHeight,
  options: {
    bezierCurve: false,
    responsive: true,
    transitions: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0,
      },
    },
    aspectRatio: 1,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "index",
      intersect: false,
    },
    animation: {
      animateScale: false,
      animateRotate: false,
      duration: 0,
    },
    legend: {
      display: true,
      fontColor: "black",
      labels: {
        fontColor: "black",
      },
      onClick: (e) => e.stopPropagation(),
    },
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Number Samples",
            fontColor: "black",
          },
          gridLines: {
            display: false,
          },
          ticks: {
            fontSize: 15,
            fontColor: "black", // this here
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Height Results (mm)",
            fontColor: "black",
          },
          display: true,
          gridLines: {
            display: true,
            color: "#824b78",
          },
          ticks: {
            fontSize: 15,
            fontColor: "black", // this here
            beginAtZero: false,
          },
        },
      ],
    },
  },
});

function generateDataHeight(chart, peakForce, labels) {
  var heightarr = [];
  var complianceSpring = document.getElementById("compliance-spring").value;
  var freelengthbottom = document.getElementById("length-spring").value;
  var paddselected = document.getElementById("padd-setting-spring").value;
  var freelength = Number(freelengthbottom) + Number(paddselected) * 20 * 0.001;
  peakForce.map((e, i) => {
    var height = freelength - e * complianceSpring * 0.000001;
    heightarr.push(Number(height.toFixed(3)));
  });

  var mean = [];
  var meanvalue = heightarr.reduce((a, b) => a + b, 0) / heightarr.length;

  heightarr.map(() => {
    mean.push(Number(meanvalue.toFixed(3)));
  });
  // --------Std height Calculation--------------//
  var subtractedArrayHeight = heightarr.map(function (item, index) {
    return item - mean[index];
  });

  var height_array_pow = subtractedArrayHeight.map(function (x) {
    return Math.pow(x, 2);
  });

  var sumOfsubtracts_height = height_array_pow.reduce((a, b) => a + b, 0);
  var squaredStdheight = sumOfsubtracts_height / subtractedArrayHeight.length;
  var stdheight = Math.sqrt(squaredStdheight);
  var varianceheight = Number(
    document.getElementById("height-tolerance").value
  );
  var uslheight = [];
  var lslheight = [];
  var Usl_heightvalue = meanvalue + varianceheight / 2;
  var Lsl_heightvalue = meanvalue - varianceheight / 2;
  var Cpheight = varianceheight / (6 * stdheight);
  heightarr.map(() => {
    uslheight.push(Number(Usl_heightvalue.toFixed(3)));
    lslheight.push(Number(Lsl_heightvalue.toFixed(3)));
  });

  var heightmax = document.getElementById("height-max");
  var heightmin = document.getElementById("height-min");
  var heightstd = document.getElementById("height-std");
  var heightcp = document.getElementById("height-cp");
  if (stdheight != 0 || heightarr.length > 5) {
    heightmax.innerText = Math.max(...heightarr).toFixed(3);
    heightmin.innerText = Math.min(...heightarr).toFixed(3);
    heightstd.innerText = stdheight.toFixed(4);
    heightcp.innerText = Cpheight.toFixed(4);
  } else {
    heightmax.innerText = Math.max(...heightarr).toFixed(3);
    heightmin.innerText = Math.min(...heightarr).toFixed(3);
    heightstd.innerText = "-";
    heightcp.innerText = "-";
  }

  addNewDataChartheight(chart, heightarr, mean, uslheight, lslheight, labels);
}

function addNewDataChartheight(chart, heightarr, mean, USL, LSL, labels) {
  chart.data.datasets[0].data = mean;
  chart.data.datasets[1].data = USL;
  chart.data.datasets[2].data = LSL;
  chart.data.labels = labels;
  chart.data.datasets[3].data = heightarr;

  var minheight = Math.min(...heightarr, LSL[0]);
  var maxheight = Math.max(...heightarr, USL[0]);
  var heightSpan = maxheight - minheight;
  maxheight += 0.1 * Number(heightSpan.toFixed(3));
  minheight -= 0.1 * Number(heightSpan.toFixed(3));
  minheight = Math.floor(Number(minheight.toFixed(3)) * 100) / 100;
  maxheight = Math.ceil(Number(maxheight.toFixed(3)) * 100) / 100;
  var options = {
    bezierCurve: false,
    responsive: true,
    transitions: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0,
      },
    },
    aspectRatio: 1,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "index",
      intersect: false,
    },
    animation: {
      animateScale: false,
      animateRotate: false,
      duration: 0,
    },
    legend: {
      display: true,
      fontColor: "black",
      labels: {
        fontColor: "black",
      },
      onClick: (e) => e.stopPropagation(),
    },
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Number Samples",
            fontColor: "black",
          },
          gridLines: {
            display: false,
          },
          ticks: {
            fontSize: 15,
            fontColor: "black", // this here
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Height Results (mm)",
            fontColor: "black",
          },
          display: true,
          gridLines: {
            display: true,
            color: "#824b78",
          },
          ticks: {
            fontSize: 15,
            stepSize: 0.01,
            fontColor: "black", // this here
            beginAtZero: false,
            min: minheight,
            max: maxheight,
          },
        },
      ],
    },
  };
  chart.options = options;

  chart.update();
}

function resetCharts(chartForce, chartheight) {
  chartForce.data.datasets[0].data = [];
  chartForce.data.datasets[1].data = [];
  chartForce.data.datasets[2].data = [];
  chartForce.data.labels = [];
  chartForce.data.datasets[3].data = [];

  chartForce.update();

  chartheight.data.datasets[0].data = [];
  chartheight.data.datasets[1].data = [];
  chartheight.data.datasets[2].data = [];
  chartheight.data.labels = [];
  chartheight.data.datasets[3].data = [];

  chartheight.update();
}

window.setInterval(() => {
  if (!ispausedUpdate) {
    generateDataForce(lineChartForce);
  }
}, 1000);
