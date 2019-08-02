# webpack-extension-manifest-plugin

> Creates manifest json file based on you config 

[![Travis Build Status](https://img.shields.io/travis/Scrum/webpack-extension-manifest-plugin.svg?style=flat-square&label=unix)](https://travis-ci.org/Scrum/webpack-extension-manifest-plugin)[![AppVeyor Build Status](https://img.shields.io/appveyor/ci/GitScrum/webpack-extension-manifest-plugin.svg?style=flat-square&label=windows)](https://ci.appveyor.com/project/GitScrum/webpack-extension-manifest-plugin)[![node](https://img.shields.io/node/v/webpack-extension-manifest-plugin.svg?style=flat-square)]()[![npm version](https://img.shields.io/npm/v/webpack-extension-manifest-plugin.svg?style=flat-square)](https://www.npmjs.com/package/webpack-extension-manifest-plugin)[![Dependency Status](https://david-dm.org/Scrum/webpack-extension-manifest-plugin.svg?style=flat-square)](https://david-dm.org/Scrum/webpack-extension-manifest-plugin)[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/sindresorhus/xo)[![Coveralls status](https://img.shields.io/coveralls/Scrum/webpack-extension-manifest-plugin.svg?style=flat-square)](https://coveralls.io/r/Scrum/webpack-extension-manifest-plugin)

[![npm downloads](https://img.shields.io/npm/dm/webpack-extension-manifest-plugin.svg?style=flat-square)](https://www.npmjs.com/package/webpack-extension-manifest-plugin)[![npm](https://img.shields.io/npm/dt/webpack-extension-manifest-plugin.svg?style=flat-square)](https://www.npmjs.com/package/webpack-extension-manifest-plugin)

## Why ?
Simplifies the development of cross-platform browser extension
- [x] Firefox
- [x] Chrome
- [x] EDGE
- [ ] Safari

## Install

```bash
npm i -D webpack-extension-manifest-plugin
```

> **Note:** This project is compatible with node v8+

## Usage

**baseManifest.js**
```js
export default {
  name: 'my manifest'
};
```

**webpack.config.js**
```js
import WebpackExtensionManifestPlugin from 'webpack-extension-manifest-plugin';
import baseManifest from './baseManifest.js';
import pkg from './package.json';

module.exports = {
  plugins: [
    new WebpackExtensionManifestPlugin({
      config: {
        base: baseManifest,
        extend: {version: pkg.version}
      }
    })
  ]
};

```
*Create manifest.json with extend configs `{name: 'my manifest', version: '0.0.0'}`*

## Options

### `config`
Type: `Object`  
Default: `{}`  
Description: *Can take a ready-made configuration for a file manifest or a set of parameters `base`, `extend`*  
