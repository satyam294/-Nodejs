const fs = require("fs");

function logReqRes(filename) {
  const middleWareFn = (req, res, next) => {
    fs.appendFile(filename, `${Date.now()} : ${req.method} : ${req.path}\n`, (err, data) => {
      next();
    });
  }
  return middleWareFn;
} 

module.exports = {
  logReqRes
};