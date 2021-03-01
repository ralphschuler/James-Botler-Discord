import flagMap from '../data/flagMap';
import translate from '../modules/translate';

export const emojis = flagMap.map((flag) => flag.flag_emoji);
export default async function _method(client, reaction, user) {
	if (reaction.message.cleanContent === '') return;
	const flag = flagMap.find((flag) => flag.flag_emoji === reaction.emoji);
	const reply = await reaction.message.channel.send(await translate('Translating ...', flag.lang_code));
	translate(reaction.message.cleanContent, flag.lang_code).then(() => {
		reply.edit(`**${translation}**`);
	});
}
