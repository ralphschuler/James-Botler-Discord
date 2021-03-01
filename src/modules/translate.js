import db from 'quick.db';
import tunnelFetch from '../utilities/tunnelFetch';

const translations = new db.table('translations');

export default async function _method(str, lang) {
	const hash = sha256(str);
	let translation = translations.get(`${hash}.${lang}`);

	if (translation) {return translation;}

	translation = translate(str, lang);
	if (!translation) return;
	translations.set(`${hash}.${lang}`, translation);

	return translation;
}

async function translate(str, lang) {
	const response = await tunnelFetch({
		method: 'POST',
		url: config.translation_api,
		data: { q: str },
		params: {
			source: 'auto',
			target: lang,
		},
	});

	return response.data.translation;
}