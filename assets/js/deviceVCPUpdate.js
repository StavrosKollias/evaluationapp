// COmpliance Calibration
var updateVCP = false;
function loadVCP(DeviceIP) {
  var lcdimg = document.getElementById("lcDImage");
  var d = new Date();
  $.ajax({
    type: "GET",
    url: `http://${DeviceIP}/vcplcd.cgi?`,
    data: "",
    success: function () {
      lcdimg.setAttribute(
        "src",
        "http://" + DeviceIP + "/vcplcd.cgi?" + d.getTime()
      );
      updateVCP = true;
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      updateVCP = false;
    },
  });

  setTimeout(() => {
    if (updateVCP) {
      loadVCP(DeviceIP);
    }
  }, 1000);
}

function clickHandlersVCP(DeviceIP) {
  $("#btnU").click(function () {
    $.ajax({ url: "http://" + DeviceIP + "/vcpbtn.cgi?btn=U" });
  });

  $("#btnL").click(function () {
    $.ajax({
      url: "http://" + DeviceIP + "/vcpbtn.cgi?btn=L",
      type: "GET",
    });
  });

  $("#btnR").click(function () {
    $.ajax({
      url: "http://" + DeviceIP + "/vcpbtn.cgi?btn=R",
      type: "GET",
    });
  });

  $("#btnD").click(function () {
    $.ajax({
      url: "http://" + DeviceIP + "/vcpbtn.cgi?btn=D",
      type: "GET",
    });
  });
}
