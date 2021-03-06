import database from '../database.json';
import Person from './person.js';
import TerminalController from './terminalController.js';

const DEFAULT_LANG = 'pt-BR';
const STOP_TERM = ':q';

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminalController.question();
    if (answer === STOP_TERM) {
      terminalController.closeTerminal();
      console.log('process finished!');
      return;
    }
    const person = Person.generateInstanceFromString(answer);
    return mainLoop();
  } catch (error) {
    console.error('DEU RUIM**', error);
    return mainLoop();
  }
}

await mainLoop();
// 1 Bike 10000 2000-01-01 2002-02-02
// 2 Bike,Avião,Navio 2000000 2000-01-01 2002-02-01
