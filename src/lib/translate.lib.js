import fetch from './fetch.lib'
import flagMap from'./flag.map'
import sha256 from "./sha256.lib"
import path from "path"
import fs from "fs"
import config from '../config'
import escape from './escape.lib'


export default async function translate_lib(text, target) {
  if (!_isSupported(target)) return new Error(`Language "${target}" is not supported!`)

  target = flagMap[target]

  const hash = sha256(text);
  const dbPath = path.join(config.cache_dir, `${hash}.db`);
  const db = fs.existsSync(dbPath) ? JSON.parse(fs.readFileSync(dbPath)) : {};
  if (!db.source) db.source = text

  if (db && db[target]) {
    return db[target];
  } else {
    const translation = escape(await _translate(text, target));
    if (!translation) return new Error(`No translation found for language "${target}"`);
    db[target] = translation;

    fs.writeFileSync(dbPath, JSON.stringify(db));
    return translation;
  }
};

function _isSupported(flag) {
  return Object.keys(flagMap).indexOf(flag) !== -1
}

async function _translate(text, target) {
  const response = await fetch({
    method: "POST",
    url: config.translation_api,
    data: { q: text },
    params: {
      source: "auto",
      target,
    },
  });
  
  return response.data.translation;
}
