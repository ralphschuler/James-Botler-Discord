import initializeCommands from '../commands';
import commandParser from '../utilities/commandParser';
import config from '../config';

export default function _method(client, message) {
	const args = commandParser(message.text);
	const command = args.shift().slice(config.command_prefix.length);
	client.emit(`command.${command}`, message, ...args);
}