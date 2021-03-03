export async function run(client, message, ...args) {
  try {
    message.reply("Pong!");
  } catch (error) {
    client.logger.error(error);
  }
}
