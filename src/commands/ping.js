export async function run(client, message, ...args) {
  try {
    message.inlineReply("Pong!");
  } catch (error) {
    client.logger.error({error});
  }
}
