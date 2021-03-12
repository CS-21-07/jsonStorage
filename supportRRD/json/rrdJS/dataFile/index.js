var fs = require("fs");
var rrdStream = require("../package/index");

//input and output files
var rrdOrigin = "../../../../supportRRD/wam.xml.rrd";
var destination = "wam.json";

var end = Date.now();
var start = 0;

var rrd = fs.createReadStream(rrdOrigin);
var writeStream = fs.createWriteStream(destination);

rrd
  .pipe(rrdStream({ start: start, end: end }).on("row", function () {}))
  .pipe(writeStream);

function rrdtojson(rrdOrigin, destination) {
  setTimeout(() => {
    var end = Date.now();
    var start = 0;

    var rrd = fs.createReadStream(rrdOrigin);
    var writeStream = fs.createWriteStream(destination);

    rrd
      .pipe(rrdStream({ start: start, end: end }).on("row", function () {}))
      .pipe(writeStream);
  }, 8000);
}

function processName(fileName) {
  const dest = fileName.split(".")[0];
  return dest.concat(".json");
}

function action() {
  const baseFolder = "../../../../supportRRD/";

  fs.readdir(baseFolder, (err, files) => {
    if (err) {
      console.log("ERROR: " + err);
    }
    files.forEach((file) => {
      console.log(file);

      if (file.endsWith(".rrd")) {
        setTimeout(() => {
          console.log(file, "--->", processName(file));
          var rrdOrigin = baseFolder.concat(file);
          var destination = processName(file);

          var end = Date.now();
          var start = 0;

          var rrd = fs.createReadStream(rrdOrigin);
          var writeStream = fs.createWriteStream(destination);

          rrd
            .pipe(
              rrdStream({ start: start, end: end }).on("row", function () {})
            )
            .pipe(writeStream);
        }, 5000);

        // setTimeout(rrdtojson(rrdOrigin, processName(file)), 1000);
        // rrdtojson(rrdOrigin, processName(file));
        // setImmediate(rrdtojson(rrdOrigin, processName(file)));
      }
    });
  });
}

// action();
