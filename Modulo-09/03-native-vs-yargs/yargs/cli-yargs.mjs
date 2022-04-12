#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// node cli-yargs.mjs --name Paulo --age 19 --power nerd
const hero = ({ name, age, power }) => ({ name, age, power, id: Date.now() });
const { argv } = yargs(hideBin(process.argv))
  .command('createHero', 'create a hero', (builder) => {
    return builder
      .option('name', {
        alias: 'n',
        demandOption: true,
        describe: 'hero name',
        type: 'string',
      })
      .option('age', {
        alias: 'a',
        demandOption: true,
        describe: 'hero age',
        type: 'number',
      })
      .option('power', {
        alias: 'p',
        demandOption: true,
        describe: 'hero power',
        type: 'string',
      })
      .example(
        'createHero --name Flash --age 55 --power Speed',
        'create a hero',
      )
      .example('createHero -n Batman -a 60 -p Rich', 'create a hero');
  })
  .epilog('copyright 2022 - Paulo Eduardo Corporation');

// node cli-yargs.mjs --help
// node cli-yargs.mjs createHero --help
// node cli-yargs.mjs createHero -n Flash -a 55 -p Speed
// node cli-yargs.mjs createHero --name Flash --age 55 --power Speed

console.log(hero(argv));
