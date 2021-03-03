import { readdirSync } from "fs";

export default async function run(client) {
  client.logger.info("Initializing reactions");
  const paths = readdirSync("./src/reactions");
  client.logger.debug(paths);

  for (let i = 0; i < paths.length; i++) {
    if (paths[i] == "index.js") continue;
    client.logger.info(`Initializing reaction ${paths[i].split(".")[0]}`);
    let reaction = require(`./${paths[i]}`);
    client.logger.debug(reaction.emojis);
    for (const emoji of reaction.emojis) {
      client.on(`messageReactionAdd.${emoji}`, (...args) => {
        reaction.run(client, ...args)
      });
    }
  }
}
