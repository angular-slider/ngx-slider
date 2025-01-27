/*
   This script generates the API documentation pages in demo app using Typedoc.
   The files are then embedded as additional assets in the demo app.

   Annoyingly, typedoc v0.27 or later is only available as ESM module,
   therefore this script had to be rewritten to ESM format as well.
   This required renaming it to *.mjs to make Node pick it up as ESM
   as well as separating it from the other existing *.js scripts
   which still use CommonJS (mixing the two script types in one directory simply doesn't work).
 */

import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import { fileURLToPath } from 'url';
import * as typedoc from 'typedoc';

// Workaround for missing __dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));


/** Copy README.md from given location to the library directory
    This is copy-pasted from scripts/utils.js as unfortunately utils.js
    is still in CommonJS format and cannot be imported here
 */
function copyReadmeMd(sourceReadmeMd) {
  const libReadmeFile = path.resolve(__dirname, '../../src/ngx-slider/README.md');

  const sourceReadme = fs.readFileSync(sourceReadmeMd, { encoding: 'utf8'});
  fs.writeFileSync(libReadmeFile, sourceReadme, {encoding: 'utf8'});
}


/** Run typedoc over library public API files to generate HTML files with documentation.
 */
async function generateTypedocDocs(typedocDocsDir) {
  const publicApiConfigFile = path.resolve(__dirname, '../../src/ngx-slider/lib/public_api.json');
  const publicApiConfig = JSON.parse(fs.readFileSync(publicApiConfigFile, { encoding: 'utf8' }));

  const files = publicApiConfig.exports
    .map(exportDef => path.resolve(__dirname, `../../src/ngx-slider/lib/${exportDef.file}.ts`));

  // HACK: When Typedoc finds a README.md file, it uses it to generate content for the index page of documentation
  // This is not very helpful, as it repeats the same stuff that's already shown on Github and NPM
  // So instead, replace the README.md with our own file
  const apiDocsReadmeFile = path.resolve(
    __dirname,
    "../../typedoc/README.md"
  );
  copyReadmeMd(apiDocsReadmeFile);

  const app = await typedoc.Application.bootstrap({
    entryPoints: ["src/ngx-slider/lib/public_api.ts"],
  });

  app.options.addReader(new typedoc.TSConfigReader());
  app.options.addReader(new typedoc.TypeDocReader());

  const project = await app.convert();
  await app.generateDocs(project, typedocDocsDir);

  // HACK: restore the README.md to original
  const mainReadmeFile = path.resolve(__dirname, "../../README.md");
  copyReadmeMd(mainReadmeFile);
}

const typedocDocsDir = path.resolve( __dirname, "../../docs");
rimraf.sync(typedocDocsDir);
mkdirp.sync(typedocDocsDir);

generateTypedocDocs(typedocDocsDir)
  .then(() => {
    console.log("Typedoc generation finished successfully.")
  })
  .catch(console.error);
