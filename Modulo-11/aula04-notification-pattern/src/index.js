import { createServer } from 'http';
import HeroEntity from './heroEntity.js';
import { statusCodes } from './util/httpStatusCodes.js';

async function handler(request, response) {
  for await (const data of request) {
    try {
      const parseData = JSON.parse(data);
      // simulando um outro erro, por exemplo de banco de dados
      if (Reflect.has(parseData, 'connectionError')) {
        // só um erro genérico para trazer outro cenário de erro inesperado
        throw new Error('error connecting to DB!');
      }
      const hero = new HeroEntity(parseData);
      if (!hero.isValid()) {
        response.writeHead(statusCodes.BAD_REQUEST);
        response.end(hero.notifications.join('\n'));
        continue;
      }

      // cadastra no banco de dados...

      response.writeHead(statusCodes.OK);
      response.end();
    } catch (error) {
      response.writeHead(statusCodes.INTERNAL_SERVER_ERROR);
      response.end();
    }
  }
}

createServer(handler).listen(3000, () => console.log('running at 3000'));

// curl -i localhost:3000 -X POST --data '{"name": "Vingador", "age": "80"}'
