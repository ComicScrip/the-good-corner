import { createClient } from "redis";
import env from "./env";

export default createClient({ socket: { host: env.KVSTORE_HOST } })
  .on("error", (err) => console.log("Valkey Client Error", err))
  .on("connect", (err) => console.log("Valkey connection successful"))
  .connect();
