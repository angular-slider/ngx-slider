/*
   This script generates the API documentation pages in demo app using Typedoc.
   The files are then embedded as additional assets in the demo app.
 */

const path = require("path");
const mkdirp = require("mkdirp");
const fs = require("fs");
const rimraf = require("rimraf");

const typedocDocsDir = path.resolve( __dirname, "../docs");
rimraf.sync(typedocDocsDir);
mkdirp.sync(typedocDocsDir);

const inexFile = path.resolve(
  typedocDocsDir,
  "index.html"
);

// Typedoc generation is disabled for this branch
fs.writeFileSync(inexFile, 'Typedoc generation disabled', {encoding: 'utf8'});
