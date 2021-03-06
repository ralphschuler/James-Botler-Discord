import { readdirSync } from "fs";

export default async function run(client) {
  try {
    client.logger.info("Initializing commands");
    const paths = readdirSync("./src/commands");
    client.logger.debug(paths);

    for (let i = 0; i < paths.length; i++) {
      if (paths[i] == "index.js") continue;
      client.logger.info(`Initializing command ${paths[i].split(".")[0]}`);
      let command = require(`./${paths[i]}`);
      client.on(`command.${paths[i].split(".")[0]}`, (...args) => {
        command.run(client, ...args);
      });
    }
  } catch (error) {
    client.logger.error({error});
  }
}
