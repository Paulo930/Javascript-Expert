#!/usr/bin/env node
// global bin: npm link
// remove global bin: npm unlink -g @paulo930/codegen

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { createLayersIfNotExists } from './createLayers.js';
import { createFiles } from './createFiles.js';

const {
  argv: { componentName },
} = yargs(hideBin(process.argv))
  // codegen skeleton
  .command('skeleton', 'create project skeleton', (builder) => {
    return builder
      .option('component-name', {
        alias: 'c',
        demandOption: true,
        describe: "component's name",
        type: 'array',
      })

      .example(
        'skeleton --component-name product',
        'create a project with a single domain',
      )
      .example(
        'skeleton -c product -c person -c colors',
        'creates a project with a list of domain',
      );
  })
  .epilog('copyright 2021 = Paulo Corporation');

const end = process.env.NODE_ENV;
const defaultMainFolder = end === 'dev' ? 'tmp' : 'src';

const layers = ['repository', 'service', 'factory'].sort();
const config = {
  layers,
  defaultMainFolder,
  mainPath: '.',
};

await createLayersIfNotExists(config);

const pendingPromises = [];
for (const domain of componentName) {
  const result = createFiles({
    ...config,
    componentName: domain,
  });
  pendingPromises.push(result);
}

await Promise.all(pendingPromises);
