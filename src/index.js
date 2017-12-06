import fs from 'fs';
import path from 'path';
import merge from 'deepmerge';

export default class WebpackExtensionManifestPlugin {
    constructor(baseConfig, extendConfig) {
        this.baseConfig = baseConfig;
        this.extendConfig = extendConfig;
    }

    apply(compiler) {
        compiler.plugin('emit', (compilation, callback) => {
            const json = JSON.stringify(merge(this.baseConfig, this.extendConfig));
            const file = path.join(compilation.outputOptions.path, 'manifest.json');
            fs.writeFile(file, json, callback);
        });
    }
}
