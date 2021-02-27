import translateModule from "../modules/translate.module";

export default async function reactionAdd_event(reaction, user) {
  if (reaction.partial) {
    await reaction.fetch();
  }
  translateModule(reaction, user);
}
