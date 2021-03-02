import tunnelFetch from "../utilities/tunnelFetch";

const translations = [];

export default async function method(str, lang) {
  const hash = sha256(str);
  let translation;

  if (translation) {
    return translation;
  }

  translation = translate(str, lang);
  if (!translation) return;

  return translation;
}

async function translate(str, lang) {
  const response = await tunnelFetch({
    method: "POST",
    url: config.translation_api,
    data: { q: str },
    params: {
      source: "auto",
      target: lang,
    },
  });

  return response.data.translation;
}
