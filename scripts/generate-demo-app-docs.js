/*
   This script generates the API documentation pages in demo app using Typedoc.
   The files are then embedded as additional assets in the demo app.
 */

const path = require("path");
const mkdirp = require("mkdirp");
const fs = require("fs");
const rimraf = require("rimraf");
const typedoc = require("typedoc");

const utils = require("./utils.js");

/** Run typedoc over library public API files to generate HTML files with documentation.
 */
async function generateTypedocDocs(typedocDocsDir) {
  const publicApiConfigFile = path.resolve(__dirname, '../src/ngx-slider/lib/public_api.json');
  const publicApiConfig = JSON.parse(fs.readFileSync(publicApiConfigFile, { encoding: 'utf8' }));

  const files = publicApiConfig.exports
    .map(exportDef => path.resolve(__dirname, `../src/ngx-slider/lib/${exportDef.file}.ts`));

  // HACK: When Typedoc finds a README.md file, it uses it to generate content for the index page of documentation
  // This is not very helpful, as it repeats the same stuff that's already shown on Github and NPM
  // So instead, replace the README.md with our own file
  const apiDocsReadmeFile = path.resolve(
    __dirname,
    "../typedoc/README.md"
  );
  utils.copyReadmeMd(apiDocsReadmeFile);

  const app = await typedoc.Application.bootstrap({
    entryPoints: ["src/ngx-slider/lib/public_api.ts"],
  });

  app.options.addReader(new typedoc.TSConfigReader());
  app.options.addReader(new typedoc.TypeDocReader());

  const project = await app.convert();
  await app.generateDocs(project, typedocDocsDir);

  // HACK: restore the README.md to original
  const mainReadmeFile = path.resolve(__dirname, "../README.md");
  utils.copyReadmeMd(mainReadmeFile);
}

const typedocDocsDir = path.resolve( __dirname, "../docs");
rimraf.sync(typedocDocsDir);
mkdirp.sync(typedocDocsDir);

generateTypedocDocs(typedocDocsDir)
  .then(() => {
    console.log("Typedoc generation finished successfully.")
  })
  .catch(console.error);
