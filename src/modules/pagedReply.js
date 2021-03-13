export default async function run(message, pages, startIndex = 0) {
  let index = startIndex;
  let text = pageToString(pages[index]);

  const filter = (reaction, user) => {
    return (
      ["◀️", "▶️"].includes(reaction.emoji.name) &&
      user.id === message.author.id
    );
  };

  const reply = await message.channel.send(text);
  reply.react("◀️");
  reply.react("▶️");

  const collector = reply.createReactionCollector(filter, { time: 15000 });
  collector.on("collect", (reaction, user) => {
    console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);

    switch (reaction.emoji.name) {
      case "◀️":
        if (index > 0) index--;
        else if (index <= 0) index = pages.length-1;
        break;

      case "▶️":
        if (index < pages.length-1) index++;
        else if (index >= pages.length-1) index = pages.length-1;
        break;
    }
    collector.resetTimer()
    reaction.remove()
    text = pageToString(pages[index]);
    reply.edit(text);
  });
  collector.on("end", (collected) => reply.delete());
  message.delete()
}

function pageToString(page) {
  return page.map((entry, index) => `${index}. ${entry}`);
}
