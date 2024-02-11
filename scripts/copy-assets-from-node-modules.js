const fs = require('fs');
const path = require('path');

function copyBootstrapCss() {
  const sourceFile = path.resolve(__dirname, '../node_modules/bootstrap/dist/css/bootstrap.min.css');
  const destinationFile = path.resolve(__dirname, '../src/demo-app/assets/bootstrap.min.css');
  
  fs.copyFileSync(sourceFile, destinationFile);
}

function copyBootstrapIcons() {
  const sourceFile = path.resolve(__dirname, '../node_modules/bootstrap-icons/bootstrap-icons.svg');
  const destinationFile = path.resolve(__dirname, '../src/demo-app/assets/bootstrap-icons.svg');
  
  fs.copyFileSync(sourceFile, destinationFile);
}

function copyPrismjsCss() {
  const sourceFile = path.resolve(__dirname, '../node_modules/prismjs/themes/prism.min.css');
  const destinationFile = path.resolve(__dirname, '../src/demo-app/assets/prism.min.css');
  
  fs.copyFileSync(sourceFile, destinationFile);
}

copyBootstrapCss()
copyBootstrapIcons()
copyPrismjsCss()