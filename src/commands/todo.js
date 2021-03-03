import pagedReply from "../modules/pagedReply";

export async function run(client, message, ...args) {
  pagedReply([
    [
      "Seite 1 Eintrag 1",
      "Seite 1 Eintrag 2",
      "Seite 1 Eintrag 3",
      "Seite 1 Eintrag 4",
      "Seite 1 Eintrag 5",
      "Seite 1 Eintrag 6",
      "Seite 1 Eintrag 7",
    ],
    [
      "Seite 2 Eintrag 1",
      "Seite 2 Eintrag 2",
      "Seite 2 Eintrag 3",
      "Seite 2 Eintrag 4",
      "Seite 2 Eintrag 5",
      "Seite 2 Eintrag 6",
      "Seite 2 Eintrag 7",
    ],
    [
      "Seite 3 Eintrag 1",
      "Seite 3 Eintrag 2",
      "Seite 3 Eintrag 3",
      "Seite 3 Eintrag 4",
      "Seite 3 Eintrag 5",
      "Seite 3 Eintrag 6",
      "Seite 3 Eintrag 7",
    ],
  ]);

  switch (args.shift()) {
    default:
    case "list":
      list(message, args);
      break;

    case "add":
      add(message, args);
      break;

    case "show":
      show(message, args);
      break;

    case "del":
      del(message, args);
      break;
  }
}

async function show(message, args) {
  const { channel, author } = message;
  let user = db.get(`${author.id}`);

  let reply_text = user.lists
    .map((list) => list.map((entry) => entry.content).join("\n"))
    .join("\n");

  let index = user.index;
  const reply = await channel.send(reply_text[index].join("\n"));
  reply.react("◀️");
  reply.react("▶️");

  const filter = (reaction, user) => {
    return (
      ["◀️", "▶️"].includes(reaction.emoji.name) &&
      user.id === message.author.id
    );
  };

  reply
    .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
    .then((collected) => {
      const reaction = collected.first();

      if (reaction.emoji.name === "◀️") {
        if (index > 0) index--;
        else if (index <= 0) index = reply_text.length;
      } else {
        if (index < reply_text.length) index++;
        else if (index >= reply_text.length) index = reply_text.length;
      }
    });
}

async function add(message, args) {}

async function del(message, args) {}

async function list(message, args) {}
