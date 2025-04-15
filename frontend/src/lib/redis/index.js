const { default: Redis } = require("ioredis");

const IoRedis = new Redis({
   host: process.env.REDIS_HOST,
   port: +(process.env.REDIS_PORT || "6379"),
   username: process.env.REDIS_USER,
   password: process.env.REDIS_PASSWORD,
   maxRetriesPerRequest: null,
});

export default IoRedis;
