import tunnelFetch from "../utilities/tunnelFetch";
import sha256 from "../utilities/sha256";
import config from "../config";
import fs from "fs";
import path from "path";

export default async function run(str, lang) {
  const hash = sha256(str);
  const dbPath = path.join("./", "cache", `${hash}.db`);
  const db = fs.existsSync(dbPath) ? JSON.parse(fs.readFileSync(dbPath)) : {};
  if (!db.source) db.source = str;

  if (!db || !db[lang]) {
    db[lang] = await translate(str, lang);
    fs.writeFile(dbPath, JSON.stringify(db), (error) => {});
  }

  return db[lang];
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
