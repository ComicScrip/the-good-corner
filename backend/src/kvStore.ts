import { createClient } from "redis";

export default createClient({ socket: { host: "kvStore" } })
  .on("error", (err) => console.log("Valkey Client Error", err))
  .on("connect", (err) => console.log("Valkey connection successful"))
  .connect();
