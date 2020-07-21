function sendCalibrationTableToCFA() {
  const deviceIP = document.getElementById("cfa-ip-input").value;
  $.ajax({
    url: `http://${deviceIP}/protect/sensor.htm`,
    type: "GET",
    success: function (data) {
      const string = $(data).find("form").html();
      const contentTableElement = document.getElementById("content-cal-table");
      const indexLastChild = getLastChildIndexFromElement($(string)[0]);
      addChildToElement(contentTableElement, $(string)[0]);
      removeChildFromElement(
        contentTableElement.children[0],
        contentTableElement.children[0].children[indexLastChild]
      );
    },
  });
}

function getLastChildIndexFromElement(element) {
  return element.children.length - 1;
}

function removeChildFromElement(parent, child) {
  parent.removeChild(child);
}

function addChildToElement(parent, child) {
  parent.appendChild(child);
}
