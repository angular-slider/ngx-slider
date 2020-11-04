const fs = require('fs');
const path = require('path');

const sourceFile = path.resolve(__dirname, '../node_modules/bootstrap-icons/bootstrap-icons.svg');
const destinationFile = path.resolve(__dirname, '../src/demo-app/assets/bootstrap-icons.svg');

fs.copyFileSync(sourceFile, destinationFile);