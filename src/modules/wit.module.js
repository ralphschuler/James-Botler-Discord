import { Wit } from "node-wit";
import config from "../config";
import * as Sentry from "@sentry/node";

const wit = new Wit({
  accessToken: config.witai_token,
});

export default async function wit_module(message) {
  try {
    wit
      .message(message.content)
      .then((data) => {
        logger.debug(JSON.stringify(data));
      })
      .catch(console.error);
  } catch (error) {
    logger.error(error);
  }
}
