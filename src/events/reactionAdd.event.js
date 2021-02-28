import translateModule from "../modules/translate.module";
import ocrModule from "../modules/ocr.module";

export default async function reactionAdd_event(reaction, user) {
  if (reaction.partial) {
    await reaction.fetch();
  }
  if (reaction.count >= 2) return
  translateModule(reaction, user);
  ocrModule(reaction, user);
}
