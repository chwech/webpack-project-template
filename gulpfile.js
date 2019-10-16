const { watch, series } = require("gulp");
const { exec } = require("child_process");
const port = 10915;
function defaultTask(cb) {
  const start = `apicloud wifiStart --port ${port}`;
  exec(start, function(err, stdout, stderr) {
    if (err) {
      cb(err);
    } else {
      cb(stdout);
    }
  });
  cb()
}

function wifiSync(cb) {
  const wifiSync = `apicloud wifiSync --project ./ --updateAll false --port ${port}`;
  exec(wifiSync, function(err, stdout, stderr) {
    if (err) {
      console.log(err);
      cb();
    } else {
      console.log(stdout, stderr);
      cb();
    }
  });
}

function wifiPreveiw(cb) {
  const wifiPreveiw = `apicloud wifiPreview --file ./lib/index.html --port ${port}`;
  exec(wifiPreveiw, function(err, stdout, stderr) {
    if (err) {
      console.log(err);
      cb();
    } else {
      console.log(stdout, stderr);
      cb();
    }
  });
}

function bundle(cb) {
  exec(`npm run build`, function(err, stdout, stderr) {
    if (err) {
      console.log(err);
      cb();
    } else {
      console.log(stdout, stderr);
      cb();
    }
  });
}

exports.sync = wifiPreveiw;
exports.wifiSync = series(bundle, wifiSync);
exports.default = defaultTask;
