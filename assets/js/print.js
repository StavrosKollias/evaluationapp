let blob;

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
    const doc = new PDFDocument();

    // pipe the document to a blob
    const stream = doc.pipe(blobStream());

    // add your content to the document here, as usual

    doc.fontSize(25).text("Repost Portable Evaluation!", 100, 100);

    var canvas_img_force = document
      .getElementById("evaluation-chart-force")
      .toDataURL("image/png", 1.0);

    doc.image(canvas_img_force, {
      fit: [250, 300],
      align: "center",
      valign: "center",
    });

    var canvas_img_height = document
      .getElementById("evaluation-chart-height")
      .toDataURL("image/png", 1.0);
    doc.image(canvas_img_height, {
      fit: [250, 300],
      align: "center",
      valign: "center",
    });
    // Add another page
    doc
      .addPage()
      .fontSize(25)
      .text("Here is some vector graphics...", 100, 100);

    // Draw a triangle
    doc
      .save()
      .moveTo(100, 150)
      .lineTo(100, 250)
      .lineTo(200, 250)
      .fill("#FF3300");

    // Apply some transforms and render an SVG path with the 'even-odd' fill rule
    doc
      .scale(0.6)
      .translate(470, -380)
      .path("M 250,75 L 323,301 131,161 369,161 177,301 z")
      .fill("red", "even-odd")
      .restore();

    // Add some text with annotations
    doc
      .addPage()
      .fillColor("blue")
      .text("Here is a link!", 100, 100)
      .underline(100, 100, 160, 27, { color: "#0000FF" })
      .link(100, 100, 160, 27, "http://google.com/");

    // get a blob when you're done
    doc.end();

    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    download();
    // var mywindow = window.open("Report", "PRINT", "height=700,width=1000");
    // mywindow.document.write(
    //   "<html><head><title>" + "Report Stats" + "</title>"
    // );
    // mywindow.document.write(
    //   "</head><body style='margin:0; -webkit-print-color-adjust: exact;' >"
    // );
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
    // var canvas_img_force = document
    //   .getElementById("evaluation-chart-force")
    //   .toDataURL("image/png", 1.0);
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
    // window.print();
    app.loadURL(canvas_img_force);
    //mywindow.close();
    return true;
  }
}

front.on("pdfPath", (msg) => {
  console.log(msg);
  alert(msg);
});

function download() {
  if (!blob) return;
  var url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = "evaluationReport.pdf";
  a.click();
  window.URL.revokeObjectURL(url);
}

stream.on("finish", function () {
  // get a blob you can do whatever you like with
  blob = stream.toBlob("application/pdf");

  // or get a blob URL for display in the browser
  const url = stream.toBlobURL("application/pdf");
  const iframe = document.querySelector("iframe");
  iframe.src = url;
});
