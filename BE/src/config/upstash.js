import { Ratelimiter } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import "/loadEnv.js";

// Create a new ratelimiter, that allows 100 requests per 20 Seconds
const rateLimit = new Ratelimiter({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "20 s"),
});

export default rateLimit;
