const fs = require('fs');
const path = require('path');

// Generate package.json file based on package.json.template and main package.json

const mainFile = path.resolve(__dirname, '../package.json');
const libTemplateFile = path.resolve(__dirname, '../src/ng5-slider/package.json.template');
const libFile = path.resolve(__dirname, '../src/ng5-slider/package.json');

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

const prettyPrintedLibConfig = JSON.stringify(libConfig, null, 2);

fs.writeFileSync(libFile, prettyPrintedLibConfig, { encoding: 'utf8' });

// Copy main README.md file

const mainReadmeFile = path.resolve(__dirname, '../README.md');
const libReadmeFile = path.resolve(__dirname, '../src/ng5-slider/README.md');

const mainReadme = fs.readFileSync(mainReadmeFile, { encoding: 'utf8'});
fs.writeFileSync(libReadmeFile, mainReadme, {encoding: 'utf8'});