import config from "../config";
import commandParser from "../utilities/commandParser";

export default async function _method(client, message) {
  if (message.author.bot || message.author === client.user) return;

  if (message.cleanContent.startsWith(config.command_prefix)) {
    const args = commandParser(message.cleanContent);
    const command = args.shift().slice(config.command_prefix.length);
    client.emit(`command.${command}`, message, args);
  }
}
