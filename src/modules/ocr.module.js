import Tesseract from "tesseract.js";
import escape from "../lib/escape.lib";
import axios from "axios";
import gm from "gm";

export default async function ocr_module(reaction, user) {
  try {
    if (reaction.emoji.name !== "🔍") return 
    if (!reaction.message.attachments.array().length) return
    logger.info("got OCR request");
    const attachments = reaction.message.attachments.array();
    let message_text = {head: '[Begin] Text Detection'}
    let message = await reaction.message.channel.send(Object.values(message_text).join('\n'));
    
    for (let i = 0; i < attachments.length; i++) {
      const { name, url, width, height } = attachments[i];
      if (
        name.endsWith(".jpg") ||
        name.endsWith(".png") ||
        name.endsWith(".jpeg")
      ) {
        const img = await axios.get(url, { responseType: "arraybuffer" });
        gm(Buffer.from(img.data, "utf-8"))
          .toBuffer("JPG", function (error, buffer) {
            if (error) return logger.error(error);
            Tesseract.recognize(buffer, "eng", {
              cachePath: './cache',
              logger: async function (m) {
                if (Math.floor(m.progress*10) % 10 != 0) return
                logger.info(m)
                const key = m.status.replace(/\(.*\)/, '').split(' ')
                key.shift()
                message_text[key.join()] = `[${m.progress == 1 ? 'DONE' : Math.floor(m.progress*100)+'%'}] ${m.status}`             
                await message.edit(
                  escape(Object.values(message_text).join('\n'))
                );
              },
            })
              .then(async function({ data }) {
                message_text = { header: data.text }
                await message.edit(escape(Object.values(message_text).join('\n')));
              })
              .catch((error) => {
                logger.error(error);
              });
          });
      }
    }
  } catch (error) {
    logger.error(error);
  }
}
