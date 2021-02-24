const countryFlagEmoji = require("country-flag-emoji");
const axios = require("axios");
const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

// https://discord.com/oauth2/authorize?client_id=786007253362278400&scope=bot

const langMap = {
    'CN': 'zh-CN'
}

const API =
  "https://script.google.com/macros/s/AKfycbwrX-55daZyA6boYk_sjNW5OHs1MBImPSY1d_k0_kHs1wF4HyjfDBlB/exec";

client.once("ready", () => {
  client.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        console.log(error);
        return;
      }
    }

    const lang = countryFlagEmoji.list.find(
      (emoji) => emoji.emoji === reaction.emoji.name
    );

    if (!lang) return;

    try {
      const response = await axios.get(API, {
        params: {
          q: reaction.message.cleanContent.trim(),
          source: "auto",
          target: langMap[lang.code] || lang.code,
        },
      });
      if (response.status != 200) return
      if (!response.data.translation) console.log(response.data)
    
      if (response.data.translation === reaction.message.cleanContent.trim()) return

      const member = await reaction.message.guild.member(reaction.message.author)
      
      reaction.message.channel.send(new Discord.MessageEmbed()
                                    .setColor('#0099ff')
                                    .setAuthor(member ? member.nickname : reaction.message.author.username, reaction.message.author.displayAvatarURL())
                                    .setDescription(response.data.translation))
      console.log(
        `[${lang.code}]\t${reaction.message.cleanContent}\n\t${response.data.translation}\n`
      );
    } catch (error) {
        console.log(error)
        return
    }
  });
});

client.login("Nzg2MDA3MjUzMzYyMjc4NDAw.X9AITA.sxaLyfuGZ2cGGXRF6OPMnn-y6No");
