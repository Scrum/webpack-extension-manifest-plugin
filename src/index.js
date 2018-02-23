import merge from 'deepmerge';
import Reflect from 'core-js/library/es6/reflect';

export default class WebpackExtensionManifestPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.plugin('emit', (compilation, callback) => {
            if (typeof this.options !== 'object') {
                return callback(new Error('options it should be `object`.'));
            }

            if (Reflect.has(this.options, 'config') && typeof this.options.config !== 'object') {
                return callback(new Error('config it should be `object`.'));
            }

            let json = '';

            if (Reflect.has(this.options.config, 'base')) {
                json = merge(this.options.config.base, this.options.config.extend || {});
            }

            if (!Reflect.has(this.options.config, 'base')) {
                json = this.options.config || {};
            }

            const jsonString = JSON.stringify(json, null, 2);

            compilation.assets['manifest.json'] = {
                source: function () {
                    return jsonString;
                },
                size: function () {
                    return jsonString.length;
                }
            };
            callback();
        });
    }
}
