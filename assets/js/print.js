function printStats() {
  var pressName = document.getElementById("Press-Name").value;
  var press_eval_height_tolerance = document.getElementById("height-tolerance")
    .value;
  var press_Eval_force_tolerance = document.getElementById("force-tolerance")
    .value;
  var numberOfSamplesForce = lineChartForce.data.labels.length;
  if (pressName == "") {
    alert("Please Enter Press Name You Evaluated");
    document.getElementById("Press-Name").focus();
  } else {
    // var mywindow = window.open("", "PRINT", "height=700,width=1000");
    // mywindow.document.write("<html><head><title>" + "Report Stats" + "</title>");
    // mywindow.document.write("</head><body style='margin:0; -webkit-print-color-adjust: exact;' >");
    // mywindow.document.write("<h1 >" + "Report Stats for Press: " + pressName + "</h1>");
    // mywindow.document.write(
    //    '<h4>Limits</h4><label  class="cmd-label">Height Tolerance(um): <span id="force-mean">' +
    //       press_eval_height_tolerance +
    //       '</span></label><br><label  class="cmd-label">Force Tolerance(N): <span >' +
    //       press_Eval_force_tolerance +
    //       "</span></label><br>"
    // );
    // mywindow.document.write("<h1 > Force Results </h1>");
    // mywindow.document.write("<h3 > Number of Samples:" + numberOfSamplesForce + "</h3>");
    // var canvas_img_force = document.getElementById("evaluation-chart-force").toDataURL("image/png", 1.0);
    // mywindow.document.write(
    //    "<br><div  style='padding: 2rem 0; height:400px;'><img  style='height:100%; width:90%; filter: saturate(8);'src='" +
    //       canvas_img_force +
    //       "'/></div>"
    // );
    // mywindow.document.write(document.getElementById("force-stats").innerHTML);
    // mywindow.document.write("<br> <div style='page-break-after:always'></div> <br><h1 > Height Results </h1>");
    // mywindow.document.write("<h3 > Number of Samples:" + numberOfSamplesForce + "</h3>");
    // var canvas_img_height = document.getElementById("evaluation-chart-height").toDataURL("image/png", 1.0);
    // mywindow.document.write(
    //    "<br><div ' style='height:400px;'><img  style='height:100%; width:90%; filter: saturate(8);'src='" +
    //       canvas_img_height +
    //       "'/></div>"
    // );
    // mywindow.document.write(document.getElementById("height-stats").innerHTML);
    // mywindow.document.close();
    // mywindow.focus();
    // mywindow.print();
    window.print();
    //mywindow.close();
    return true;
  }
}
