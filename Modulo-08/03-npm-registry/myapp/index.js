// para importar do diretório use o comando abaixo
// --experimental-specifier-resolution=node index.js

// import FluentSQLBuilder from './../fluentsql-jest-tdd-yt/';
import FluentSQLBuilder from '@paulo930/fluentsql';

import database from './database/data.json';

const result = FluentSQLBuilder.for(database)
  .where({ registered: /^(2020|2019)/ })
  .select(['name'])
  .limit(3)
  .countBy('name')
  // .groupCount('name')
  .build();

console.log({ result });
