import { Client } from 'discord.js';
import initializeEvents from './events';
import initializeCommands from './commands';
import initializeReactions from './reactions';
import { createLogger, transports, format } from 'winston';
import { SentryTransport } from 'winston-node-sentry';
import config from './config';

const sentry = config.sentry_dsn != null ? [new SentryTransport({
	level: 'error',
	sentryOpts: {
		dsn: config.sentry_dsn,
	},
})] : []

export default class JamesBotler extends Client {
	constructor() {
		super({
			partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
		});

		this.logger = new createLogger({
			level: 'info',
			format: format.json(),
			transports: [
				new transports.Console({ level: 'info' }),
				...sentry,
			],
		});

		this.once('ready', this.onReady);

		this.on('warn', (...args) => this.logger.warn(...args));
		this.on('error', (...args) => this.logger.error(...args));
		this.on('debug', (...args) => this.logger.debug(...args));

		this.login(config.discord_token);
	}

	onReady() {
		initializeEvents(this);
		initializeCommands(this);
		initializeReactions(this);

		this.logger.info({ status: 'Ready!' });
	}

}

new JamesBotler();