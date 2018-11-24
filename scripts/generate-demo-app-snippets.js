/*
   This script will go through all *.component.template.html (and *.component.title-template.html)
   files in snippets and generate the corresponding HTML template *.component.html, pasting the code
   examples in the HTML.
 */

const fs = require('fs');
const path = require('path');
const escape = require('escape-html');
const prism = require('prismjs');
require('prismjs/components/prism-scss');
require('prismjs/components/prism-typescript');

/** Generate template for a single file */
function generateTemplate(templateFile, snippetsDir) {
  const titleTemplateFile = templateFile.replace('.template.html', '.title-template.html');
  const outputTemplateFile = templateFile.replace('.template.html', '.html');
  const codeFile = templateFile.replace('.template.html', '.ts');
  const styleFile = templateFile.replace('.template.html', '.scss');

  const titleTemplateFileContent = fs.readFileSync(path.resolve(snippetsDir, titleTemplateFile), { encoding: 'utf8' });

  const templateFileContent = fs.readFileSync(path.resolve(snippetsDir, templateFile), { encoding: 'utf8' });
  const templateTabHtml = tabHtml(path.basename(outputTemplateFile), templateFileContent, 'html');

  let codeFileContent = fs.readFileSync(path.resolve(snippetsDir, codeFile), { encoding: 'utf8' });
  // The only modification to the source file is to remove the @local prefix from slider import
  codeFileContent = codeFileContent.replace(/@local\/ng5-slider/g, "ng5-slider");
  const codeTabHtml = tabHtml(path.basename(codeFile), codeFileContent, 'typescript');

  let styleTabHtml = '';
  if (fs.existsSync(path.resolve(snippetsDir, styleFile))) {
    const styleFileContent = fs.readFileSync(path.resolve(snippetsDir, styleFile), { encoding: 'utf8' });
    styleTabHtml = tabHtml(path.basename(styleFile), styleFileContent, 'scss');
  }

  const outputHtmlFileContent = `<h2 class="snippet-title">${titleTemplateFileContent}</h2>
<div class="snippet-card card">
  <div class="card-body">
    <div class="snippet-content">
      ${templateFileContent}
    </div>

    <ngb-tabset class="snippet-code-tabset">
      ${codeTabHtml}

      ${templateTabHtml}

      ${styleTabHtml}
    </ngb-tabset>
  </div>
</div>`;

  fs.writeFileSync(path.resolve(snippetsDir, outputTemplateFile), outputHtmlFileContent, { encoding: 'utf8' });
}

/** Generate highlighted source code using prism */
function highlight(code, lang) {
  return prism.highlight(code.trim(), prism.languages[lang]);
}

/** We need to escape { and } in the source code because Angular will complain
 * when we're not actually using them for bindings */
function escapeBraces(html) {
  return html.replace(/([{}])/g, "{{ '$1' }}");
}

/** Common HTML template for tab */
function tabHtml(tabTitle, codeContent, codeLang) {
  return `<ngb-tab title="${escape(tabTitle)}">
      <ng-template ngbTabContent>
        <pre class="language-${codeLang}"><code class="language-${codeLang}">${escapeBraces(highlight(codeContent, codeLang))}</code></pre>
      </ng-template>
    </ngb-tab>`;
}

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


const snippetsDir = path.resolve(__dirname, '../src/demo-app/app/snippets');

const templateFiles = readdirRecursivelySync(snippetsDir)
  .filter((file) => file.endsWith('component.template.html'));

for (let templateFile of templateFiles) {
  generateTemplate(templateFile, snippetsDir)
}
