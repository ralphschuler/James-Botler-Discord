import countryFlagEmoji from "country-flag-emoji"
import translateLib from "../lib/translate.lib"
import config from '../config'
import Discord from 'discord.js'
import escape from '../lib/escape.lib'
import * as Sentry from '@sentry/node'

export default async function translate_module(reaction, user) {  
    const transaction = Sentry.startTransaction({
        op: "translate_module",
        name: "translate_module",
      });
    try {
        const lang = countryFlagEmoji.list.find(
            (emoji) =>
              emoji.emoji === reaction.emoji.name
          );
          if (!lang || reaction.message.cleanContent === '') return;
        
          const translation = await translateLib(
            escape(reaction.message.cleanContent),
            lang.code.toUpperCase()
          );
          if (!translation) return;
        
          const member = await reaction.message.guild.member(reaction.message.author);
          if (config.use_fancy_translation || reaction.message.guild.id === '750443496787279914') {
              reaction.message.channel.send(
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
              )
          } else {
              reaction.message.channel.send(`**${translation}**`)
          }
    } catch (error) {
        Sentry.captureException(error)
    } finally {
        transaction.finish()
    }
}