import Discord from "discord.js";
import messageEvent from "./events/message.event";
import reactionAddEvent from "./events/reactionAdd.event";
import winston from "winston";
import { SentryTransport } from "winston-node-sentry";
import config from "./config";

global.logger = new winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({ level: "silly" }),
    new SentryTransport({
      level: "error",
      sentryOpts: {
        dsn: config.sentry_dsn,
      },
    }),
  ],
});

const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.once("ready", () => {
  client.on("message", messageEvent);
  client.on("messageReactionAdd", reactionAddEvent);

  logger.info("Ready!");
});

client.login(config.discord_token);
