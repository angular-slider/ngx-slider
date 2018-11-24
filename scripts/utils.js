const fs = require('fs');
const path = require('path');

/** Get all files in directory recursively, synchronously */
function readdirRecursivelySync(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (let file of list) {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(readdirRecursivelySync(file));
    } else {
      results.push(file);
    }
  }
  return results;
}

exports.readdirRecursivelySync = readdirRecursivelySync;
