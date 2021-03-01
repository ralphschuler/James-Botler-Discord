import dotenv from 'dotenv';

process.env.NODE_ENV === 'production' ? dotenv.config() : dotenv.config('.env-staging')

export default {
	salt: process.env.SALT,
	translation_api: process.env.TRANSLATION_API,
	discord_token: process.env.DISCORD_TOKEN,
	sentry_dsn: process.env.SENTRY_DSN,
	witai_token_en: process.env.WITAI_TOKEN_EN,
	use_fancy_translation: false,
	proxies: [
		'socks5h://tor0:9050',
		'socks5h://tor1:9050',
		'socks5h://tor2:9050',
		'socks5h://tor3:9050',
		'socks5h://tor4:9050',
		'socks5h://tor5:9050',
		'socks5h://tor6:9050',
		'socks5h://tor7:9050',
		'socks5h://tor8:9050',
		'socks5h://tor9:9050',
	],
	command_prefix: '!',
};
