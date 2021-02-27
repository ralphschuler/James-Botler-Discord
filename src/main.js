import Discord from "discord.js"
import messageEvent from './events/message.event'
import reactionAddEvent from './events/reactionAdd.event'
import * as Sentry from "@sentry/node"
import * as Tracing from "@sentry/tracing"
import config from './config'

Sentry.init({
  dsn: config.sentry_dsn,
  tracesSampleRate: 1.0
});

process.on('uncaughtException', function(err) {
  Sentry.captureException(err);
});

const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.once("ready", () => {
  client.on('message', messageEvent)
  client.on("messageReactionAdd", reactionAddEvent);

  console.log("Ready!")
});

client.login(config.discord_token);

