const countryFlagEmoji = require("country-flag-emoji");
const translate = require("./lib/translate.lib");
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint } = format;
const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

global.logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    prettyPrint()
  ),
  transports: [    
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

// https://discord.com/oauth2/authorize?client_id=786007253362278400&scope=bot

client.once("ready", () => {
  logger.info("James here!")
  client.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        logger.error({ error });
        return;
      }
    }

    const lang = countryFlagEmoji.list.find(
      (emoji) =>
        emoji.emoji === reaction.emoji.name
    );
    if (!lang) return;

    const translation = await translate(
      reaction.message.cleanContent,
      lang.code.toUpperCase()
    );
    if (!translation) return;

    const member = await reaction.message.guild.member(reaction.message.author);
    /*reaction.message.channel.send(
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
    );*/
    reaction.message.channel.send(`**${translation.trim()}**`)
  });
});

client.login("Nzg2MDA3MjUzMzYyMjc4NDAw.X9AITA.zJaltETj4kAA2_3QDWfBwbcbzHg");
