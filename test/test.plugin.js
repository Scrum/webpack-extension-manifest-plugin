import path from 'path';
import fs from 'fs';
import test from 'ava';
import tempy from 'tempy';
import pathExists from 'path-exists';
import webpack from 'webpack';
import Plugin from '../src';

function read(pathFile) {
    return new Promise((resolve, reject) => {
        fs.readFile(pathFile, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            return resolve(data);
        });
    });
}

test.cb('Chould create manifest json in output folder', t => {
    t.plan(3);

    const outputDir = tempy.directory();
    const baseConfig = {name: 'my plugin'};
    const extendConfig = {version: '0.0.0'};
    const config = Object.assign(baseConfig, extendConfig);

    webpack({
        entry: './test/app/app.js',
        output: {
            path: outputDir,
            filename: '[name].js'
        },
        plugins: [
            new Plugin(baseConfig, extendConfig)
        ]
    }, async (err, stats) => {
        if (err) {
            return t.end(err);
        }

        if (stats.hasErrors()) {
            return t.end(stats.toString());
        }

        const filePath = path.join(outputDir, 'manifest.json');
        const file = await read(filePath);
        const manifest = JSON.parse(file);

        t.deepEqual(config, manifest);
        t.deepEqual(
            Object.keys(manifest),
            Object.keys(config)
        );
        t.true(await pathExists(filePath));

        t.end();
    });
});
