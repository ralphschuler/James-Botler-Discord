import { Wit } from "node-wit";
import config from "../config";

const wit_en = new Wit({
  accessToken: config.witai_token_en,
});
const wit_de = new Wit({
  accessToken: config.witai_token_de,
});
const wit_zh = new Wit({
  accessToken: config.witai_token_zh,
});

export default async function run(message) {
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
