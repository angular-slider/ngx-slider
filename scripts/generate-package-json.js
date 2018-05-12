const fs = require('fs');
const path = require('path');

const mainFile = path.resolve(__dirname, '../package.json');
const libTemplateFile = path.resolve(__dirname, '../src/ng5-slider/package.json.template')
const libFile = path.resolve(__dirname, '../src/ng5-slider/package.json')

const libTemplateConfig = JSON.parse(fs.readFileSync(libTemplateFile, { encoding: 'utf8' }));
const mainConfig = JSON.parse(fs.readFileSync(mainFile, { encoding: 'utf8' }));

let libConfig = {};

for (let key of libTemplateConfig.keysToCopyFromMainPackageJson) {
    libConfig[key] = mainConfig[key];
}

libConfig = Object.assign({}, libConfig, libTemplateConfig, libConfig);
delete libConfig.keysToCopyFromMainPackageJson;

const prettyPrintedLibConfig = JSON.stringify(libConfig, null, 2);

fs.writeFileSync(libFile, prettyPrintedLibConfig, { encoding: 'utf8' });
