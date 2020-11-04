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

const utils = require('./utils.js');

/** Generate template for a single file */
function generateTemplate(templateFile, snippetsDir) {
  const titleTemplateFile = templateFile.replace('.template.html', '.title-template.html');
  const sectionIdTemplateFile = templateFile.replace('.template.html', '.id-template.html');
  const outputTemplateFile = templateFile.replace('.template.html', '.html');
  const codeFile = templateFile.replace('.template.html', '.ts');
  const styleFile = templateFile.replace('.template.html', '.scss');

  const titleTemplateFileContent = fs.readFileSync(path.resolve(snippetsDir, titleTemplateFile), { encoding: 'utf8' }).trim();
  const sectionIdTemplateFileContent = fs.readFileSync(path.resolve(snippetsDir, sectionIdTemplateFile), { encoding: 'utf8' }).trim();

  const templateFileContent = fs.readFileSync(path.resolve(snippetsDir, templateFile), { encoding: 'utf8' });
  const templateTabHtml = tabHtml(path.basename(outputTemplateFile), templateFileContent, 'html');

  let codeFileContent = fs.readFileSync(path.resolve(snippetsDir, codeFile), { encoding: 'utf8' });
  // The only modification to the source file is to remove the @local prefix from slider import
  codeFileContent = codeFileContent.replace(/@local\/ngx-slider/g, "@angular-slider/ngx-slider");
  const codeTabHtml = tabHtml(path.basename(codeFile), codeFileContent, 'typescript');

  let styleTabHtml = '';
  if (fs.existsSync(path.resolve(snippetsDir, styleFile))) {
    const styleFileContent = fs.readFileSync(path.resolve(snippetsDir, styleFile), { encoding: 'utf8' });
    styleTabHtml = tabHtml(path.basename(styleFile), styleFileContent, 'scss');
  }

  const outputHtmlFileContent = `
  <h2 class="snippet-title" id="${sectionIdTemplateFileContent}">${titleTemplateFileContent}
    <a routerLink="./" fragment="${sectionIdTemplateFileContent}"><svg class="bi section-link" width="1em" height="1em" fill="currentColor"><use xlink:href="assets/bootstrap-icons.svg#link"/></svg></a>
  </h2>
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


const snippetsDir = path.resolve(__dirname, '../src/demo-app/app/snippets');

const templateFiles = utils.readdirRecursivelySync(snippetsDir)
  .filter((file) => file.endsWith('component.template.html'));

for (let templateFile of templateFiles) {
  generateTemplate(templateFile, snippetsDir)
}
