export default async function _method(message, pages, startIndex = 0) {
  let index = startIndex;
  let text = pageToString(pages[index]);

  const filter = (reaction, user) => {
    return (
      ["◀️", "▶️"].includes(reaction.emoji.name) &&
      user.id === message.author.id
    );
  };

  const reply = await message.channel.send(text);
  await reply.react("◀️");
  await reply.react("▶️");

  const collector = reply.createReactionCollector(filter, { time: 15000 });
  collector.on("collect", (reaction, user) => {
    console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);

    switch (reaction.emoji.name) {
      case "◀️":
        if (index > 0) index--;
        else if (index <= 0) index = pages.length;        
        break;

      case "▶️":
        if (index < pages.length) index++;
        else if (index >= pages.length) index = pages.length;
        break;
    }

    text = pageToString(pages[index])
    reply.edit(text)
  });
  collector.on("end", (collected) => reply.delete());
}

function pageToString(page) {
  return page.map((entry, index) => `${index}. ${entry}`);
}
