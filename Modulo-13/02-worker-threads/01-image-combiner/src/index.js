import { createServer } from 'http';
import { parse, fileURLToPath } from 'url';
import { Worker } from 'worker_threads';

// https://sharp.pixelplumbing.com/install#worker-threads
import sharp from 'sharp';

import { dirname } from 'path';
const currentFolder = dirname(fileURLToPath(import.meta.url));
const workerFileName = 'worker.js';
async function joinImages(images) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(`${currentFolder}/${workerFileName}`);
    worker.postMessage(images);
    worker.once('message', resolve);
    worker.once('error', reject);
    worker.once('exit', (code) => {
      if (code !== 0) {
        return reject(
          new Error(`Thread ${worker.threadId} stopped with exit code ${code}`),
        );
      }
      console.log(`the thread ${worker.threadId} exited!`);
    });
  });
}

async function handler(request, response) {
  if (request.url.includes('joinImages')) {
    const {
      query: { background, img },
    } = parse(request.url, true);
    const imageBase64 = await joinImages({
      image: img,
      background,
    });

    response.writeHead(200, {
      'Content-Type': 'text/html',
    });

    response.end(
      `<img style="width:100%;height:100%" src="data:image/jpeg;base64,${imageBase64}" />`,
    );
    return;
  }

  return response.end('ok');
}

createServer(handler).listen(3000, () => console.log('running at 3000'));

// localhost:3000/joinImages?img=https://cdn2.unrealengine.com/egs-godofwar-santamonicastudio-ic1-400x400-5819bbf696c5.png?h=270&resize=1&w=480&background=https://wallpaperboat.com/wp-content/uploads/2019/04/rick-and-morty-wallpaper-wallpaper-background-001.jpg

// https://cdn2.unrealengine.com/egs-godofwar-santamonicastudio-ic1-400x400-5819bbf696c5.png?h=270&resize=1&w=480
// https://image.api.playstation.com/vulcan/ap/rnd/202109/2821/KETQoN98jJjcRvpAoGekxAPP.png

// background
// https://wallpapercave.com/wp/AcZacvL.jpg
// https://wallpaperboat.com/wp-content/uploads/2019/04/rick-and-morty-wallpaper-wallpaper-background-001.jpg
