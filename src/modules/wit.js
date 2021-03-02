import { Wit } from "node-wit";
import config from "../config";

const wit_en = new Wit({
  accessToken: config.witai_token_en,
});

export default async function method(message) {
  try {
    wit_en
      .message(message.content)
      .then((data) => {
        logger.debug(JSON.stringify(data));
      })
      .catch(console.error);
  } catch (error) {
    logger.error(error);
  }
}
