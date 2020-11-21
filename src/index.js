import merge from 'deepmerge';
import webpack from 'webpack';
process.traceDeprecation = true;
export default class WebpackExtensionManifestPlugin {
  constructor(options) {
    this.options = options;
  }

  webpack4(_compiler) {
    _compiler.hooks.emit.tap(
      'WebpackExtensionManifestPlugin',
      compilation => {
        if (typeof this.options !== 'object') {
          throw new TypeError('options it should be `object`.');
        }

        if (
          Reflect.has(this.options, 'config') &&
          typeof this.options.config !== 'object'
        ) {
          throw new Error('config it should be `object`.');
        }

        let json = '';

        if (Reflect.has(this.options.config, 'base')) {
          json = merge(
            this.options.config.base,
            this.options.config.extend || {}
          );
        }

        if (!Reflect.has(this.options.config, 'base')) {
          json = this.options.config || {};
        }

        const jsonString = JSON.stringify(json, null, 2);

        compilation.assets['manifest.json'] = {
          source: () => jsonString,
          size: () => jsonString.length
        };
        return true;
      }
    );
  }

  webpack5(_compiler) {
    _compiler.hooks.thisCompilation.tap(
      'WebpackExtensionManifestPlugin',
      compilation => {
        if (typeof this.options !== 'object') {
          throw new TypeError('options it should be `object`.');
        }

        if (
          Reflect.has(this.options, 'config') &&
          typeof this.options.config !== 'object'
        ) {
          throw new Error('config it should be `object`.');
        }

        let json = '';

        if (Reflect.has(this.options.config, 'base')) {
          json = merge(
            this.options.config.base,
            this.options.config.extend || {}
          );
        }

        if (!Reflect.has(this.options.config, 'base')) {
          json = this.options.config || {};
        }

        const jsonString = JSON.stringify(json, null, 2);

        compilation.hooks.processAssets.tap(
          {
            name: 'WebpackExtensionManifestPlugin',
            stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONS
          },
          _ => {
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
    if (webpack.version.startsWith('5.')) {
      this.webpack5(compiler);
    } else {
      this.webpack4(compiler);
    }
  }
}
