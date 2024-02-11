const path = require('path');
const child_process = require('child_process');

function executeCommand(command, cwd) {
  console.log(`> ${command}`);
  const output = child_process.execSync(command, {cwd: cwd});
  if (output instanceof Buffer) {
    console.log(output.toString('utf8'));
  } else {
    console.log(output);
  }
}

// scss-bundle has some nasty clashing dependencies
// The only way I found for this to work is to use a separate workspace directory with only the scss-bundle in package.json
const workspaceDir = path.resolve(__dirname, './scss-bundle-workspace');
const mainScss = path.resolve(__dirname, '../src/ngx-slider/lib/main.scss');
const distScss = path.resolve(__dirname, '../dist/ngx-slider/scss/ngx-slider.scss');

console.log('executing scss-bundle in separate workspace');
executeCommand('npm install', workspaceDir);
executeCommand(`npx scss-bundle -e ${mainScss} -o ${distScss}`, workspaceDir);