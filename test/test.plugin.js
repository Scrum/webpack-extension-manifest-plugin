import path from 'path';
import test from 'ava';
import tempy from 'tempy';
import pathExists from 'path-exists';
import webpack from 'webpack';
import loadJsonFile from 'load-json-file';
import Plugin from '../src';

const baseConfig = {name: 'my plugin'};
const extendConfig = {version: '0.0.0'};
const config = Object.assign(baseConfig, extendConfig);

test.cb('options should be `object`', t => {
  const outputDirectory = tempy.directory();
  webpack({
    mode: 'production',
    entry: './test/app/app.js',
    output: {
      path: outputDirectory,
      filename: '[name].js'
    },
    plugins: [
      new Plugin('error')
    ]
  }, error => {
    t.is(error.message, 'options it should be `object`.');
    t.end();
  });
});

test.cb('options config should be `object`', t => {
  const outputDirectory = tempy.directory();
  webpack({
    entry: './test/app/app.js',
    output: {
      path: outputDirectory,
      filename: '[name].js'
    },
    plugins: [
      new Plugin({config: 'error'})
    ]
  }, async error => {
    t.is(error.message, 'config it should be `object`.');
    t.end();
  });
});

test.cb('Chould create manifest json in output folder using the ready config', t => {
  const outputDirectory = tempy.directory();
  t.plan(2);

  webpack({
    entry: './test/app/app.js',
    output: {
      path: outputDirectory,
      filename: '[name].js'
    },
    plugins: [
      new Plugin({config: config})
    ]
  }, async (error, stats) => {
    if (error) {
      return t.end(error);
    }

    if (stats.hasErrors()) {
      return t.end(stats.toString());
    }

    const filePath = path.join(outputDirectory, 'manifest.json');
    const manifest = await loadJsonFile(filePath);
    t.deepEqual(config, manifest);
    t.true(await pathExists(filePath));

    t.end();
  });
});

test.cb('Chould create manifest json in output folder using the options', t => {
  const outputDirectory = tempy.directory();
  t.plan(2);

  webpack({
    entry: './test/app/app.js',
    output: {
      path: outputDirectory,
      filename: '[name].js'
    },
    plugins: [
      new Plugin({
        config: {
          base: baseConfig,
          extend: extendConfig
        }
      })
    ]
  }, async (error, stats) => {
    if (error) {
      return t.end(error);
    }

    if (stats.hasErrors()) {
      return t.end(stats.toString());
    }

    const filePath = path.join(outputDirectory, 'manifest.json');
    const manifest = await loadJsonFile(filePath);
    t.deepEqual(config, manifest);
    t.true(await pathExists(filePath));

    t.end();
  });
});
