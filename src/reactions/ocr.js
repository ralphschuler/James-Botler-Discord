import Tesseract from 'tesseract.js'
import gm from 'gm'
import axios from 'axios'
import escapeText from '../utilities/escapeText'

export const emojis = ["🔍", "🔎"];
export async function run(client, reaction, user) {
  if (!reaction.message.attachments.array().length) return;

  const attachments = reaction.message.attachments.array();
  let textFactory = { head: "Please Wait..." };
  const message = await reaction.message.channel.send(
    Object.values(textFactory).join("\n")
  );

  for (let i = 0; i < attachments.length; i++) {
    const { name, url } = attachments[i];
    if (
      name.endsWith(".jpg") ||
      name.endsWith(".png") ||
      name.endsWith(".jpeg")
    ) {
      const img = await axios.get(url, { responseType: "arraybuffer" });
      gm(Buffer.from(img.data, "utf-8")).toBuffer(
        "JPG",
        function (error, buffer) {
          if (error) return client.logger.error(error);
          Tesseract.recognize(buffer, "eng", {
            cachePath: "./cache",
            logger: async function (m) {
              if (Math.floor(m.progress * 10) % 10 != 0) return;
              client.logger.info(m);
              const key = m.status.replace(/\(.*\)/, "").split(" ");
              key.shift();
              textFactory[key.join()] = `[${
                m.progress == 1 ? "DONE" : Math.floor(m.progress * 100) + "%"
              }] ${m.status}`;
              await message.edit(Object.values(textFactory).join("\n"));
            },
          })
            .then(async function ({ data }) {
              textFactory = { head: data.text };
              await message.edit(escapeText(Object.values(textFactory).join("\n")));
            })
            .catch((error) => {
              client.logger.error(error);
            });
        }
      );
    }
  }
}
