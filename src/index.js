import path from 'path';
import merge from 'deepmerge';
import {validate} from 'schema-utils';
import webpack from 'webpack';

import schema from './options.json';

process.traceDeprecation = true;

const webpackVersion = Number(webpack.version.split('.')[0]);

export default class WebpackExtensionManifestPlugin {
  constructor(options) {
    validate(schema, options, {name: this.constructor.name});
    this.options = options;
  }

  requireWatch(compilation, id) {
    const idPath = path.resolve(process.cwd(), id);
    compilation.fileDependencies.add(idPath);
    const idModule = require(idPath);
    delete require.cache[require.resolve(idPath)];
    return idModule;
  }

  resolveConfig(compilation, config) {
    if (typeof config !== 'string') {
      return config;
    }

    return this.requireWatch(compilation, config);
  }

  generateJson(compilation) {
    let json;

    if (typeof this.options.config === 'string') {
      json = this.requireWatch(compilation, this.options.config);
    } else if ('base' in this.options.config || 'extend' in this.options.config) {
      json = merge(
        this.resolveConfig(compilation, this.options.config.base) || {},
        this.resolveConfig(compilation, this.options.config.extend) || {}
      );
    } else {
      json = this.options.config;
    }

    if (this.options.pkgJsonProps) {
      const packageJson = this.requireWatch(compilation, 'package.json');
      this.options.pkgJsonProps.forEach(property => {
        json[property] = packageJson[property];
      });
    }

    return JSON.stringify(json, undefined, this.options.minify ? undefined : 2);
  }

  webpack4(_compiler) {
    _compiler.hooks.emit.tap(this.constructor.name, compilation => {
      const jsonString = this.generateJson(compilation);

      compilation.assets['manifest.json'] = {
        source: () => jsonString,
        size: () => jsonString.length
      };
      return true;
    });
  }

  webpack5(_compiler) {
    _compiler.hooks.thisCompilation.tap(
      this.constructor.name,
      compilation => {
        compilation.hooks.processAssets.tap(
          {
            name: this.constructor.name,
            stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONS
          },
          _ => {
            const jsonString = this.generateJson(compilation);

            compilation.emitAsset('manifest.json', {
              source: () => jsonString,
              size: () => jsonString.length
            });
          }
        );

        return true;
      }
    );
  }

  apply(compiler) {
    switch (webpackVersion) {
      case 5:
        this.webpack5(compiler);
        break;
      case 4:
        this.webpack4(compiler);
        break;
      default:
        throw new Error('Unsupported webpack version');
    }
  }
}
