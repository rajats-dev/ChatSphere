import { Cluster } from "ioredis";

let redis = new Cluster([
  {
    host: process.env.REDIS_URL,
  },
]);

export default redis;
