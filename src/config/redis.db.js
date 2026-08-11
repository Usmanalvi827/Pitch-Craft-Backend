import { createClient } from "redis";

export let redis;

export const connectRedis = async () => {
  redis = createClient({
    url: process.env.REDIS_URL,
  });

  redis.on("error", (err) => {
    console.error("Redis Error:", err);
  });

  await redis.connect();

  console.log("Redis Connected");
};