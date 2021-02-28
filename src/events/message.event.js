import todoCommand from "../commands/todo.command";

export default async function message_event(message) {
  if (message.author.bot) return;
  todoCommand(message);
}
