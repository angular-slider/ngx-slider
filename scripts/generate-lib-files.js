const fs = require('fs');
const path = require('path');

const utils = require('./utils.js');

/** Generate package.json file based on package.json.template and main package.json */
function generatePackageJson() {
  const mainFile = path.resolve(__dirname, '../package.json');
  const libTemplateFile = path.resolve(__dirname, '../src/ngx-slider/package.json.template');
  const libFile = path.resolve(__dirname, '../src/ngx-slider/package.json');

  const libTemplateConfig = JSON.parse(fs.readFileSync(libTemplateFile, { encoding: 'utf8' }));
  const mainConfig = JSON.parse(fs.readFileSync(mainFile, { encoding: 'utf8' }));

  let libConfig = {};

  for (let key of libTemplateConfig.keysToCopyFromMainPackageJson) {
      libConfig[key] = mainConfig[key];
  }
  libConfig.dependencies = {};
  for (let dependency of libTemplateConfig.dependenciesToCopyFromMainPackageJson) {
    libConfig.dependencies[dependency] = mainConfig.dependencies[dependency];
  }
  libConfig.peerDependencies = {};
  for (let dependency of libTemplateConfig.dependenciesToCopyAsPeerDependenciesFromMainPackageJson) {
    libConfig.peerDependencies[dependency] = mainConfig.dependencies[dependency];
  }

  libConfig = Object.assign({}, libConfig, libTemplateConfig, libConfig);
  delete libConfig.keysToCopyFromMainPackageJson;
  delete libConfig.dependenciesToCopyFromMainPackageJson;
  delete libConfig.dependenciesToCopyAsPeerDependenciesFromMainPackageJson;

  for (let dependency of libTemplateConfig.dependenciesToCopyFromMainPackageJson) {
    libConfig.ngPackage.whitelistedNonPeerDependencies.push(dependency);
  }

  const prettyPrintedLibConfig = JSON.stringify(libConfig, null, 2);

  fs.writeFileSync(libFile, prettyPrintedLibConfig, { encoding: 'utf8' });
}

/** Convert public_api.json to public_api.ts */
function generatePublicApiTs() {
  const configFile = path.resolve(__dirname, '../src/ngx-slider/lib/public_api.json');
  const tsFile = path.resolve(__dirname, '../src/ngx-slider/lib/public_api.ts');

  const config = JSON.parse(fs.readFileSync(configFile, { encoding: 'utf8' }));

  let tsFileContent = '';

  for (let exportDef of config.exports) {
    if (exportDef.what instanceof Array) {
      const whats = exportDef.what.join(', ');
      tsFileContent += `export { ${whats} } from '${exportDef.file}';\n`;
    } else {
      tsFileContent += `export ${exportDef.what} from '${exportDef.file}';\n`;
    }
  }

  fs.writeFileSync(tsFile, tsFileContent, {encoding: 'utf8'});
}


generatePackageJson();
generatePublicApiTs();

const mainReadmeFile = path.resolve(__dirname, '../README.md');
utils.copyReadmeMd(mainReadmeFile);
