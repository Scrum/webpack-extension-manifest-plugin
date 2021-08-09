# webpack-extension-manifest-plugin

> Creates manifest json file based on you config 

[![Actions Status](https://github.com/Scrum/webpack-extension-manifest-plugin/workflows/Actions%20Status/badge.svg?style=flat-square)](https://github.com/Scrum/rexios/actions?query=workflow%3A%22CI+tests%22)[![node](https://img.shields.io/node/v/webpack-extension-manifest-plugin.svg?style=flat-square)]()[![npm version](https://img.shields.io/npm/v/webpack-extension-manifest-plugin.svg?style=flat-square)](https://www.npmjs.com/package/webpack-extension-manifest-plugin)[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/sindresorhus/xo)[![Coveralls status](https://img.shields.io/coveralls/Scrum/webpack-extension-manifest-plugin.svg?style=flat-square)](https://coveralls.io/r/Scrum/webpack-extension-manifest-plugin)

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

> **Note:** This project is compatible with node v10+

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

module.exports = {
  plugins: [
    new WebpackExtensionManifestPlugin({
      config: {
        base: './baseManifest.js',
        extend: {description: 'my description'}
      },
      pkgJsonProps: [
        'version'
      ]
    })
  ]
};

```
*Create manifest.json with extend configs `{name: 'my manifest', description: 'my description', version: '0.0.0'}`*

## Options

### `config`
Type: `Object`  
Default: `{}`  
Description: *Can take a ready-made configuration or filename (to fetch from) for the manifest file, or a set of parameters `base`, `extend` (both of which can be a filename or an object)*  

### `minify`
Type: `Boolean`  
Default: `false`  
Description: *Controls if the output should be minified*  

### `pkgJsonProps`
Type: `Array of strings`  
Description: *Adds specified properties from your package.json file into the manifest*  
