import path from 'path';
import merge from 'deepmerge';
import writeJsonFile from 'write-json-file';
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

            const filePath = path.join(compilation.outputOptions.path, 'manifest.json');
            let json = '';

            if (Reflect.has(this.options.config, 'base')) {
                json = merge(this.options.config.base, this.options.config.extend || {});
            }

            if (!Reflect.has(this.options.config, 'base')) {
                json = this.options.config || {};
            }

            console.log(filePath);

            writeJsonFile(filePath, json).then(callback);
        });
    }
}
