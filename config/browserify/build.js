const fs = require('fs');
const browserify = require('browserify');
const vueify = require('vueify');
const babelify = require('babelify');
const watchify = require('watchify');
const hmr = require('browserify-hmr');

const isDev = process.argv[2] === 'dev';

const bConfig = {
    entries: ['src/main.js'],
    transform: [vueify, babelify]
}

if (isDev) {
    bConfig.cache = {};
    bConfig.packageCache = {};
    bConfig.plugin = [watchify, hmr];
}

const b = browserify(bConfig);

function bundle() {
    b.bundle().pipe(fs.createWriteStream('dist/kitty-irc.js'));
}

b.on('update', bundle);
bundle();
