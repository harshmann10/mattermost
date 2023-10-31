// Create a new directory for the build output
const buildDir = './dist';
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}

// Copy the JavaScript source files to the build directory
const srcFiles = glob.sync('./src/*.js');
for (const srcFile of srcFiles) {
  fs.copyFileSync(srcFile, path.join(buildDir, srcFile));
}

// Transpile the JavaScript code to ES5
const transpiler = require('babel-cli/bin/babel');
transpiler.main([
  '--presets',
  'env',
  '--out-dir',
  buildDir,
  buildDir,
]);

// Minify the JavaScript code
const minifier = require('uglify-js');
const minifiedCode = minifier.minify(fs.readFileSync(path.join(buildDir, 'index.js'), 'utf8')).code;
fs.writeFileSync(path.join(buildDir, 'index.min.js'), minifiedCode);
