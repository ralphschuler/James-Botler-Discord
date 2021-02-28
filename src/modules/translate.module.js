import countryFlagEmoji from "country-flag-emoji";
import translateLib from "../lib/translate.lib";
import config from "../config";
import Discord from "discord.js";
import escape from "../lib/escape.lib";

export default async function translate_module(reaction, user) {
  try {
    const lang = countryFlagEmoji.list.find(
      (emoji) => emoji.emoji === reaction.emoji.name
    );
    if (!lang || reaction.message.cleanContent === "") return;
    const message = await reaction.message.channel.send('Please Wait ...');

    logger.info("got translation request");

    const translating_msg = await translateLib(
      "Translating ...",
      lang.code.toUpperCase()
    );

    if (!translating_msg)
      return await message.edit("No Translation found!");
    await message.edit(translating_msg);

    const translation = await translateLib(
      escape(reaction.message.cleanContent),
      lang.code.toUpperCase()
    );
    if (!translation)
      return await message.edit("No Translation found!");

    const member = await reaction.message.guild.member(reaction.message.author);
    if (
      config.use_fancy_translation ||
      reaction.message.guild.id === "750443496787279914"
    ) {
      await message.edit('',
        new Discord.MessageEmbed()
          .setColor("#0099ff")
          .setAuthor(
            member && member.nickname
              ? member.nickname
              : reaction.message.author.username,
            reaction.message.author.displayAvatarURL()
          )
          .setDescription(translation)
          .setFooter(lang.name, reaction.emoji.url)
      );
    } else {
      await message.edit(`**${translation}**`);
    }
    logger.info({
      translation,
      sourceText: escape(reaction.message.cleanContent),
      targetLang: lang.code.toUpperCase(),
    });
  } catch (error) {
    logger.error(error);
  }
}
