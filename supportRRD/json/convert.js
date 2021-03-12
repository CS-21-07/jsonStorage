var fs = require("fs");
var rrdStream = require("./rrdJS/package/index");

//input and output files
// var rrdOrigin = "../rawRdd/throughput.xml.rrd";
// var destination = "throughput.json";

// var end = Date.now();
// var start = 0;

// var rrd = fs.createReadStream(rrdOrigin);
// var writeStream = fs.createWriteStream(destination);

// rrd
//   .pipe(rrdStream({ start: start, end: end }).on("row", function () {}))
//   .pipe(writeStream);

function rrdtojson(rrdOrigin, destination) {
  var end = Date.now();
  var start = 0;

  var rrd = fs.createReadStream(rrdOrigin);
  var writeStream = fs.createWriteStream(destination);

  rrd
    .pipe(rrdStream({ start: start, end: end }).on("row", function () {}))
    .pipe(writeStream);
}

function processName(fileName) {
  const dest = fileName.split(".")[0];
  return dest.concat(".json");
}

function action() {
  const baseFolder = "../supportRRD/";

  fs.readdir(baseFolder, (err, files) => {
    files.forEach((file) => {
      console.log(file);
      if (file.endsWith(".rrd")) {
        console.log(file, "--->", processName(file));
        var rrdOrigin = baseFolder.concat(file);
        rrdtojson(rrdOrigin, processName(file));
      }
    });
  });
}

action();
