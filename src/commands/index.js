import { readdirSync } from 'fs';

export default function _method(client) {
	client.logger.info('Initializing commands');
	const paths = readdirSync('./src/commands');
	client.logger.debug(paths);

	for (let i = 0; i < paths.length; i++) {
		if (paths[i] == 'index.js') continue;
		client.logger.info(`Initializing command ${paths[i].split('.')[0]}`);
		const command = require(`./${paths[i]}`);
		client.on(`command.${paths[i].split('.')[0]}`, async (...args) => command(client, ...args));
	}

}