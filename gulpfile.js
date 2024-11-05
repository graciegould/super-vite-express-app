import gulp from 'gulp';
import { exec } from 'child_process';
import * as sass from 'sass'; // Updated import statement for sass
import gulpSass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import open from 'open'; // Use modern `open` package
import dotenv from 'dotenv';

const sassCompiler = gulpSass(sass);

// Load the correct environment variables based on VITE_MODE
const mode = process.env.VITE_MODE || 'development';
dotenv.config({ path: mode === 'production' ? '.env.production' : '.env' });

// Environment-based URL
const getUri = () => {
  if (process.env.VITE_MODE === 'production') {
    return process.env.VITE_API_URL || '0.0.0.0'; // Set your production URL here
  }
  return `${process.env.HOST}:${process.env.PORT || 3000}`; // Default for dev environment
};

export function compileSass() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sassCompiler().on('error', sassCompiler.logError))  // Compile SCSS to CSS
    .pipe(cleanCSS({ compatibility: 'ie8' }))  // Minify the CSS
    .pipe(gulp.dest('src/css'));
}

// Task to watch SCSS changes and recompile
export function watchSass() {
  gulp.watch('src/scss/**/*.scss', compileSass);  // Watch for changes in SCSS files
}

// Helper to run shell commands
function runCommand(command) {
  return function (cb) {
    exec(command, function (err, stdout, stderr) {
      if (err) {
        console.log(stderr);
      } else {
        console.log(stdout);
      }
      cb(err);
    });
  };
}

function runNodemon(cb) {
    const nodemon = exec('nodemon', function (err, stdout, stderr) {
      if (err) {
        console.log(stderr);
      } else {
        console.log(stdout);
      }
      cb(err);
    });
  
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);
  }  

async function openBrowser() {
  const uri = getUri();
  await open(uri); 
}

// Task to build the project using Vite
// 1. Compile SCSS to CSS
// 2. Run the Vite build command
export const build = gulp.series(
  compileSass,
  runCommand('vite build'),
  runCommand('echo Build complete!')
);

// Task to run the development environment
// 1. Compile SCSS to CSS
// 2. Watch for changes in SCSS files
// 3. Start the Express server with Nodemon for hot-reloading the server
// 4. Open the browser with the correct URL
export const runDev = gulp.series(
  compileSass,       
  gulp.parallel(
    watchSass,       
    runNodemon,  
    openBrowser     
  )
);

// Task to preview production (rebuild, compile, and serve prod files)
// 1. Build the project
// 2. Compile SCSS to CSS
// 3. Start the Express server in production mode
// 4. Open the browser with the correct URL
export const runProd = gulp.series(
  build,              
  compileSass,      
  runCommand('VITE_MODE=production node server/server.js'),       
  openBrowser      
);

// Default task for npm start
export const runDefault = process.env.VITE_MODE === 'production' ? runProd : runDev;