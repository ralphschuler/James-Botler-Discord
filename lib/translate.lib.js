const axios = require("axios");
const SocksProxyAgent = require('socks-proxy-agent')
const sha256 = require("./sha256.lib");
const path = require("path");
const fs = require("fs");

const API =
  "https://script.google.com/macros/s/AKfycbwrX-55daZyA6boYk_sjNW5OHs1MBImPSY1d_k0_kHs1wF4HyjfDBlB/exec";

const agents = [
  new SocksProxyAgent('socks5h://tor1:9050'),
  new SocksProxyAgent('socks5h://tor2:9050'),
  new SocksProxyAgent('socks5h://tor3:9050'),
  new SocksProxyAgent('socks5h://tor4:9050'),
  new SocksProxyAgent('socks5h://tor5:9050')
]

const langMap = require('./languages_map.json');

module.exports = translate = async (text, target) => {
  if (Object.keys(langMap).indexOf(target) === -1) {
    logger.error({ error: `Error: Language "${target}" not supported!` })
    return
  }
  target = langMap[target]

  const hash = sha256(text);
  const dbPath = path.join("./", "cache", `${hash}.db`);
  const db = fs.existsSync(dbPath) ? JSON.parse(fs.readFileSync(dbPath)) : {};
  if (!db.source) db.source = text

  if (db && db[target]) {
    logger.info({ text, translation: db[target], target, cache: true });
    
    return db[target];
  } else {
    const translation = await _translate(text, target);
    if (!translation) return;
    db[target] = translation;

    fs.writeFileSync(dbPath, JSON.stringify(db));
    
    logger.info({ text, translation, target, cached: false });

    return translation;
  }
};

async function _translate(text, target) {
  const response = await axios({
    method: "POST",
    url: API,
    data: { q: text },
    httpsAgent: agents[Math.floor(Math.random() * agents.length)],
    params: {
      source: "auto",
      target,
    },
  });
  if (response.status != 200) {
    logger.error({ error: "Error: Internal server error!", status: response.status, data: response.data });
    return 
  }
  if (!response.data.translation) {
    logger.error({ error: "Error: No Translation found!", status: response.status, data: response.data });
    return 
  }
  if (response.data.translation === text) {
    logger.error({ error: "Error: Translation yields same message!", status: response.status, data: response.data });
    return 
  }

  let { translation } = response.data
  translation = translation.replace(/\n\s*\n/g, '\n') // replace multi line breaks with single
  translation = translation.replace(/\s{2,}/g,' ') // remove multiple spaces
  translation = translation.replace(/^\s+|\s+$/g,'') // trim front and back
  translation = translation.replace(/^\**|\**$/g,'') // trim front and back

  return translation;
}
