var src = './src';
var dest = './dist';
var bowerDir = './bower_components';

module.exports = {
  sass: {
    src: [
      src + "/stylesheets/**/*.scss"
    ],
    dest: dest + "/stylesheets",
    bowerDir: bowerDir,
  },
  images: {
    src: [
      src + "/images/**/*"
    ],
    dest: dest + "/images"
  },
  scripts: {
    src: [
      src + "/scripts/**/*.jsx"
    ],
    dest: dest + "/scripts",
    appFile: src + "/scripts/app.jsx"
  }
}