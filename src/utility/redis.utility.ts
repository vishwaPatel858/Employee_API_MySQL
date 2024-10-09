import * as redis from "redis";
export const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.log("Error while Connecting to redis : " + err.message);
});
