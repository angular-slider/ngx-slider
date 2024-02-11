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

/** Copy README.md from given location to the library directory */
function copyReadmeMd(sourceReadmeMd) {
  const libReadmeFile = path.resolve(__dirname, '../src/ngx-slider/README.md');

  const sourceReadme = fs.readFileSync(sourceReadmeMd, { encoding: 'utf8'});
  fs.writeFileSync(libReadmeFile, sourceReadme, {encoding: 'utf8'});
}

/** Escape { and } or otherwise Angular will complain when we're not actually using them for bindings */
function escapeBracesForAngular(html) {
  return html.replace(/([{}])/g, "{{ '$1' }}");
}

/** Escape at (@) character, which is also reserved in Angular templates now. */
function escapeAtForAngular(html) {
  return html.replace(/@/g, "&#64;");
}


exports.readdirRecursivelySync = readdirRecursivelySync;
exports.copyReadmeMd = copyReadmeMd;
exports.escapeBracesForAngular = escapeBracesForAngular;
exports.escapeAtForAngular = escapeAtForAngular;