import Redis from "ioredis";
import IoRedis from ".";

export default class RedisCache {
   redis;
   exp = 120; // 2 minutes cache

   /**
    *
    * @param {Redis} redis Redis Instance
    */
   constructor(redis) {
      this.redis = redis ?? IoRedis;
   }

   async get(key, page = 1, limit = 10) {
      try {
         const dataString = await this.redis.get(
            `${key}/${page}-${limit}`
         );

         if (dataString) return JSON.parse(dataString);

         return null;
      } catch (err) {
         return null;
      }
   }

   set(key, value, page = 1, limit = 10) {
      return this.redis.set(
         `${key}/${page}-${limit}`,
         JSON.stringify(value),
         "EX",
         this.exp
      );
   }

   async delete(key) {
      const keys = await this.redis.keys(`${key}*`);

      if (keys.length) return this.redis.del(...keys);
   }
}
