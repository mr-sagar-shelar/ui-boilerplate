import fs from 'fs';
import path from 'path';

const appsDir = path.join(process.cwd(), 'src', 'apps');
const distDir = path.join(process.cwd(), 'dist');

const appNames = fs.readdirSync(appsDir).filter(name => {
  const appPath = path.join(appsDir, name);
  return fs.statSync(appPath).isDirectory();
});

appNames.forEach(appName => {
  const appNameLower = appName.toLowerCase();
  const appDistDir = path.join(distDir, appNameLower);
  if (!fs.existsSync(appDistDir)) {
    fs.mkdirSync(appDistDir, { recursive: true });
  }
  const htmlContent = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${appName}</title>
  </head>
  <body>
    <div id="${appNameLower}-app"></div>
    <script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <script type="module"src="./${appNameLower}.js"></script>
    <script>
      window.onload = (event) => {
        window.initialize${appName}("${appNameLower}-app");
      };
    </script>
  </body>
</html>`;

  fs.writeFileSync(path.join(appDistDir, `index.html`), htmlContent);
  console.log(`Created ${appNameLower}/${appNameLower}.html`);
});
