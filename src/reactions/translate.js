import flagMap from "../data/flagMap";
import translate from "../modules/translate";
import escapeText from "../utilities/escapeText";

export const emojis = flagMap.map((flag) => flag.flag_emoji);
export async function run(client, reaction, user) {
  try {
    if (reaction.message.cleanContent === "") return;
    const flag = flagMap.find(
      (flag) => flag.flag_emoji === reaction.emoji.name
    );
    const reply = await reaction.message.inlineReply("Please wait ...");
    await reply.edit(await translate("Please wait ...", flag.lang_code));
    translate(escapeText(reaction.message.cleanContent), flag.lang_code).then(
      (translation) => {
        reply.edit(`**${escapeText(translation)}**`);
      }
    );
  } catch (error) {
    client.logger.error({error});
  }
}
