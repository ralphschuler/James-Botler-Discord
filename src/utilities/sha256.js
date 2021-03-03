import crypto from "crypto";
import config from "../config";

export default function run(data) {
  const buffer = Buffer.from(data, "utf8");
  return crypto.createHmac("sha256", config.salt).update(buffer).digest("hex");
}
