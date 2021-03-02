import { readdirSync } from "fs";

export default async function _method(client) {
  client.logger.info("Initializing events");
  const paths = readdirSync("./src/events");
  client.logger.debug(paths);

  for (let i = 0; i < paths.length; i++) {
    if (paths[i] == "index.js") continue;
    client.logger.info(`Initializing event ${paths[i].split(".")[0]}`);
    const event = require(`./${paths[i]}`);
    client.on(paths[i].split(".")[0], (...args) => event(client, ...args));
  }
}
