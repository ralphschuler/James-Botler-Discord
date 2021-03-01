import config from '../config';
import command from '../modules/command';
import wit from '../modules/wit';

export default async function _method(client, message) {
	if (message.author.bot || message.author === client.user) return;

	

	if (message.cleanContent.startsWith(config.command_prefix)) {
		command(client, message);
	}
	else {
		wit(client, message);
	}
}