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
            const filePath = path.join(compilation.outputOptions.path, 'manifest.json');
            let json = '';

            if (Reflect.has(this.options.config, 'base')) {
                json = JSON.stringify(merge(this.options.config.base, this.options.config.extend || {}));
            }

            if (!Reflect.has(this.options.config, 'base')) {
                json = JSON.stringify(this.options.config || {});
            }

            writeJsonFile(filePath, json).then(callback);
        });
    }
}
