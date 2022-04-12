$.verbose = false;

import { setTimeout } from 'timers/promises';
import isSafe from 'safe-regex';

await $`docker run -p "8080:80" -d nginx`;
await setTimeout(500);
const req = await $`curl --silent localhost:8080`;
console.log('req\n', req.stdout);

const container = await $`docker ps`;

// unsafe!
// const exp = /(?<container>\w)\W+(?=nginx)(x+x+)+y/;
const exp = /(?<containerId>\w+)\W+(?=nginx)/;

if (!isSafe(exp)) throw new Error('unsafe regex!!');

const {
  groups: { containerId },
} = container.toString().match(exp);

const log = await $`docker logs ${containerId}`;
console.log('logs\n', log.stdout);

const rm = await $`docker rm -f ${containerId}`;
console.log('rm\n', rm.stdout);
