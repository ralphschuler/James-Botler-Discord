import { Wit } from 'node-wit'
import config from '../config'
import * as Sentry from '@sentry/node'

const wit = new Wit({
  accessToken: config.witai_token
});


export default async function wit_module(message) {
  const transaction = Sentry.startTransaction({
    op: "wit_module",
    name: "wit_module",
  });
  try {
    wit.message(message.content)
    .then((data) => {
        console.log(JSON.stringify(data));
      })
    .catch(console.error);
  } catch (error) {
    Sentry.captureException(error);
  } finally {
    transaction.finish();
  }
}