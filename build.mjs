import {rmSync, mkdirSync, copyFile, writeFile} from 'fs';
import {transformFile} from '@babel/core';
import {compileFromFile} from 'json-schema-to-typescript';

rmSync('lib', {force: true, recursive: true});
mkdirSync('lib');

transformFile('src/index.js', (_, {code}) =>
    writeFile('lib/index.js', code, () => {})
);

copyFile('src/options.json', 'lib/options.json', () => {});

compileFromFile('src/options.json', {format: false}).then((ts) =>
    writeFile(
        'lib/index.d.ts',
        'import { Compiler } from "webpack";\n' +
            ts.slice(ts.indexOf('interface Options')) +
            'declare class WebpackExtensionManifestPlugin{constructor(options:Options);apply(compiler:Compiler):void;}\nexport = WebpackExtensionManifestPlugin;',
        () => {}
    )
);
