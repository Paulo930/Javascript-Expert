import ContextStrategy from './src/base/contextStrategy.js';
import MongoDBStrategy from './src/strategies/mongoDBStrategy.js';
import PostgresStrategy from './src/strategies/postgresStrategy.js';

const postgresConnectionString =
  'postgres://erickwendel:senha0001@localhost:5432/heroes';
const postgresContent = new ContextStrategy(
  new PostgresStrategy(postgresConnectionString),
);
await postgresContent.connect();

const mongoDBConnectionString =
  'mongodb://erickwendel:senhaadmin@localhost:27017/heroes';
const mongoDBContent = new ContextStrategy(
  new MongoDBStrategy(mongoDBConnectionString),
);
await mongoDBContent.connect();

// await mongoDBContent.create({ name: data[1].name });
// console.log(await mongoDBContent.read());
// await postgresContent.create({ name: data[0].name });
// console.log(await postgresContent.read());

const data = [
  {
    name: 'erickwendel',
    type: 'transaction',
  },
  {
    name: 'mariasilva',
    type: 'activityLog',
  },
];

const contentTypes = {
  transaction: postgresContent,
  activityLog: mongoDBContent,
};

for (const { type, name } of data) {
  const context = contentTypes[type];
  await context.create({ name: name + Date.now() });

  console.log(type, context.dbStrategy.constructor.name);
  console.log(await context.read());
}
