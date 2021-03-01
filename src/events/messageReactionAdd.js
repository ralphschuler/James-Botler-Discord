export default async function _method(client, reaction, user) {
	if (reaction.count >= 2) return;
	if (reaction.partial) await reaction.fetch();

	client.emit(`messageReactionAdd.${reaction.emoji}`, reaction, user);
}