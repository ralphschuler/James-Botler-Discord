import { readdirSync } from "fs";

export default async function run(client) {
  try {
    client.logger.info("Initializing events");
    const paths = readdirSync("./src/events");
    client.logger.debug(paths);

    for (let i = 0; i < paths.length; i++) {
      if (paths[i] == "index.js") continue;
      client.logger.info(`Initializing event ${paths[i].split(".")[0]}`);
      let event = require(`./${paths[i]}`);
      client.on(paths[i].split(".")[0], (...args) => {
        event.run(client, ...args);
      });
    }
  } catch (error) {
    client.logger.error(error);
  }
}
