export async function run(client, reaction, user) {
  try {
    if (reaction.count >= 2) return;
    if (reaction.partial) await reaction.fetch();

    client.emit(`messageReactionAdd.${reaction.emoji}`, reaction, user);
  } catch (error) {
    client.logger.error({error});
  }
}
